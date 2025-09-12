import { createClient } from '@supabase/supabase-js'

// In Bolt-Supabase integration, these are automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Bolt-Supabase Integration Check:', {
  url: supabaseUrl ? 'Connected' : 'Not Connected',
  key: supabaseAnonKey ? 'Connected' : 'Not Connected'
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection to reparix table
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Bolt-Supabase connection to reparix table...')
    
    // Test connection to reparix table
    const { data, error } = await supabase
      .from('reparix')
      .select('count', { count: 'exact', head: true })
    
    console.log('Reparix table connection test:', { 
      success: !error, 
      error: error?.message,
      count: data 
    })
    
    return !error
  } catch (err) {
    console.error('Bolt-Supabase connection test failed:', err)
    return false
  }
}

// Insert email into reparix table
export const insertEmail = async (email) => {
  try {
    console.log('Inserting email into reparix table:', email)
    
    const { data, error } = await supabase
      .from('reparix')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          subscribed: true
        }
      ])
      .select()

    console.log('Insert result:', { data, error })
    
    if (error) {
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Insert error:', error)
    return { success: false, error }
  }
}