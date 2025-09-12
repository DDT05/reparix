import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'SET' : 'MISSING',
    key: supabaseAnonKey ? 'SET' : 'MISSING'
  })
}

// Check if using placeholder values
const isPlaceholder = (value) => {
  return !value || 
         value === 'your-supabase-url' || 
         value === 'your-supabase-anon-key' ||
         value.includes('placeholder') ||
         value.includes('your-')
}

export const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         !isPlaceholder(supabaseUrl) && 
         !isPlaceholder(supabaseAnonKey)
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)