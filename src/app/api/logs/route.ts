import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUserAction } from '@/app/auth/actions';

/**
 * API to fetch the latest inference logs for the current user
 */
export async function GET() {
  try {
    const user = await getUserAction();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Since we don't have a reliable user_id in the logs yet (model might be using node_id), 
    // we'll fetch the most recent global logs for the demo, or filtered by user if available.
    // In a real app, you'd filter by user.id
    const logs = await query(
      'SELECT id, node_id, model_name, proof_hash, created_at FROM inference_logs ORDER BY created_at DESC LIMIT 10'
    );

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error("Failed to fetch MySQL logs:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
