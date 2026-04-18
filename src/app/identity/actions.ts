"use server";

import { query } from '@/lib/db';
import { getUserAction } from '@/app/auth/actions';

/**
 * Upsert a node identity in MySQL
 */
export async function upsertIdentityAction(nodeId: string, isActive: boolean) {
  try {
    const user = await getUserAction();
    const userId = user?.id || null;

    // MySQL Upsert syntax
    await query(
      `INSERT INTO identities (node_id, is_active, user_id) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE is_active = VALUES(is_active), user_id = VALUES(user_id)`,
      [nodeId, isActive, userId]
    );

    return { success: true };
  } catch (error: any) {
    console.error("Failed to upsert identity in MySQL:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update identity status in MySQL
 */
export async function updateIdentityStatusAction(nodeId: string, isActive: boolean) {
  try {
    await query(
      'UPDATE identities SET is_active = ? WHERE node_id = ?',
      [isActive, nodeId]
    );
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update identity status in MySQL:", error);
    return { success: false, error: error.message };
  }
}
