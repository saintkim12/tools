import { SupabaseClient, createClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null
export const getSupabase = () => {
  if (!supabase) {
    supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
  }
  return supabase
}
