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
export const testSupabaseConnection = async (tableName = 'reparix') => {
  try {
    console.log(`Testing connection to table: ${tableName}`)
    
    // Test basic connection
    const { data, error } = await supabase.from(tableName).select('count', { count: 'exact', head: true })
    console.log(`Supabase connection test for ${tableName}:`, { success: !error, error, data })
    
    if (error) {
      console.error(`Table ${tableName} connection failed:`, error)
      return false
    }
    
    // Test table structure
    const { data: structureData, error: structureError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)
    
    console.log(`Table ${tableName} structure test:`, { 
      success: !structureError, 
      error: structureError,
      sampleData: structureData 
    })
    
    return !error
  } catch (err) {
    console.error(`Supabase connection test failed for ${tableName}:`, err)
    return false
  }
}