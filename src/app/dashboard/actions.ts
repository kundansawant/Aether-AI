"use server";

import { query } from '@/lib/db';

/**
 * Fetch the latest inference logs from MySQL
 */
export async function getInferenceLogsAction() {
  try {
    const logs = await query(
      'SELECT * FROM inference_logs ORDER BY created_at DESC LIMIT 20'
    ) as any[];
    
    return { success: true, data: logs };
  } catch (error: any) {
    console.error("Failed to fetch logs from MySQL:", error);
    return { success: false, error: error.message };
  }
}
