import { createClient } from '@supabase/supabase-js'

// Environment variables for production-grade security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "https://gxcbzschfvajyiwdtcqq.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || ""

if (!supabaseAnonKey) {
  console.warn("Aether Core: Missing Supabase Anon Key. Check your .env.local file.")
} else {
  console.log("Aether Core: Secure Cloud Tunnel Active")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
