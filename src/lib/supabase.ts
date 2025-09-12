import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase Config:', {
  url: supabaseUrl ? 'SET' : 'MISSING',
  key: supabaseAnonKey ? 'SET' : 'MISSING',
  urlValue: supabaseUrl,
  keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING'
})

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
         value.includes('your-') ||
         value === 'https://placeholder.supabase.co' ||
         value === 'placeholder-key'
}

export const isSupabaseConfigured = () => {
  const configured = supabaseUrl && 
         supabaseAnonKey && 
         !isPlaceholder(supabaseUrl) && 
         !isPlaceholder(supabaseAnonKey)
  
  console.log('Supabase Configuration Check:', {
    configured,
    urlValid: supabaseUrl && !isPlaceholder(supabaseUrl),
    keyValid: supabaseAnonKey && !isPlaceholder(supabaseAnonKey)
  })
  
  return configured
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('reparix').select('count', { count: 'exact', head: true })
    console.log('Supabase connection test:', { success: !error, error, data })
    return !error
  } catch (err) {
    console.error('Supabase connection test failed:', err)
    return false
  }
}