const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

console.log("Testing connection to:", supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const { data, error } = await supabase.from('identities').select('*').limit(1)
  if (error) {
    console.error("Connection FAILED:", error.message)
    console.error("Error Detail:", error)
  } else {
    console.log("Connection SUCCESS! Found identities:", data.length)
  }
}

test()
