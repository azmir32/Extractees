import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!SUPABASE_URL) {
  // Provide a clear message to non-developers on how to fix
  throw new Error(
    'Missing VITE_SUPABASE_URL. Create web/.env.local with\n' +
      'VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co\n' +
      'VITE_SUPABASE_ANON_KEY=eyJ... (your anon key)'
  )
}

if (!SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY. Create web/.env.local with\n' +
      'VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co\n' +
      'VITE_SUPABASE_ANON_KEY=eyJ... (your anon key)'
  )
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


