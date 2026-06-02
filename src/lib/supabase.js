import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Client unique. Si les variables manquent (ex: build sans .env), on expose
// un client null et les appels sont gardés par `hasSupabase`.
export const hasSupabase = Boolean(url && key)

export const supabase = hasSupabase
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
