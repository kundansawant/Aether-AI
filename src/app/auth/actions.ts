"use server";

import { createClient } from '@supabase/supabase-js';

// Server-side initialization (safe from browser extensions)
const supabaseUrl = 'https://gxcbzschfvajyiwdtcqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Y2J6c2NoZnZhanlpd2R0Y3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDcxMzIsImV4cCI6MjA5MDcyMzEzMn0.7Zy2wxLpTNtACUHO4g6dEyu4wZcQVPvZLyjwJZCy7M4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUpAction(formData: any) {
  const { email, password, origin } = formData;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function signInAction(formData: any) {
  const { email, password } = formData;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
