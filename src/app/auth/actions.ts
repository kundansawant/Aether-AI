"use server";

import { query } from '@/lib/db';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Handle User Sign Up
 */
export async function signUpAction(formData: any) {
  try {
    const { email, password } = formData;
    
    // 1. Check if user already exists
    const existingUsers = await query('SELECT id FROM users WHERE email = ?', [email]) as any[];
    if (existingUsers.length > 0) {
      return { success: false, error: "User already registered" };
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = crypto.randomUUID();

    // 3. Insert into MySQL
    await query(
      'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
      [userId, email, hashedPassword]
    );

    // 4. Create a session cookie (simplified for this migration)
    const sessionData = JSON.stringify({ id: userId, email });
    cookies().set('aether-session', sessionData, { 
      path: '/', 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return { 
      success: true, 
      user: { id: userId, email } 
    };
  } catch (err: any) {
    console.error("Sign Up Error:", err);
    return { success: false, error: "Database Identity Initialization Failed: " + (err.message || "Unknown Error") };
  }
}

/**
 * Handle User Sign In
 */
export async function signInAction(formData: any) {
  try {
    const { email, password } = formData;
    
    // 1. Find user by email
    const users = await query('SELECT * FROM users WHERE email = ?', [email]) as any[];
    if (users.length === 0) {
      return { success: false, error: "Invalid credentials" };
    }

    const user = users[0];

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid credentials" };
    }

    // 3. Create session cookie
    const sessionData = JSON.stringify({ id: user.id, email: user.email });
    cookies().set('aether-session', sessionData, { 
      path: '/', 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return { 
      success: true, 
      user: { id: user.id, email: user.email } 
    };
  } catch (err: any) {
    console.error("Sign In Error:", err);
    return { success: false, error: "Authentication Refused: " + (err.message || "Unknown Error") };
  }
}

/**
 * Handle Sign Out
 */
export async function signOutAction() {
  cookies().delete('aether-session');
  return { success: true };
}

/**
 * Server Action to get the current user session
 */
export async function getUserAction() {
  const session = cookies().get('aether-session');
  if (!session) return null;
  
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
