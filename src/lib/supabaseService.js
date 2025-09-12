import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

// Initialize Supabase client
export const initializeSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please connect to Supabase.')
    return null
  }
  
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized successfully')
  }
  
  return supabase
}

// Get Supabase client instance
export const getSupabaseClient = () => {
  if (!supabase) {
    return initializeSupabase()
  }
  return supabase
}

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const client = getSupabaseClient()
    if (!client) {
      return { success: false, error: 'Supabase not initialized' }
    }

    // Test connection by trying to select from Reparix table
    const { data, error } = await client
      .from('Reparix')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Supabase connection test failed:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Supabase connection test successful')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Supabase connection error:', error)
    return { success: false, error: error.message }
  }
}

// Insert email into Reparix table
export const insertEmailToReparix = async (email) => {
  try {
    const client = getSupabaseClient()
    if (!client) {
      throw new Error('Supabase client not initialized')
    }

    console.log('📧 Inserting email to Reparix table:', email)

    const { data, error } = await client
      .from('Reparix')
      .insert([
        { 
          email: email.toLowerCase().trim(),
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('❌ Email insertion failed:', error)
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return { 
          success: false, 
          error: 'Cette adresse email est déjà inscrite',
          isDuplicate: true 
        }
      }
      
      throw error
    }

    console.log('✅ Email inserted successfully:', data)
    return { success: true, data }

  } catch (error) {
    console.error('❌ Email insertion error:', error)
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de l\'inscription'
    }
  }
}

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '')
}

// Get connection status
export const getConnectionStatus = async () => {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      message: 'Supabase credentials not configured'
    }
  }

  const testResult = await testSupabaseConnection()
  return {
    configured: true,
    connected: testResult.success,
    message: testResult.success ? 'Connected to Supabase' : testResult.error
  }
}