import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client directly (Bolt integration)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

interface InsertResult {
  success: boolean
  error?: string
  data?: any
  isDuplicate?: boolean
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<InsertResult> => {
  try {
    // Test connection by trying to select from Reparix table
    const { data, error } = await supabase
      .from('Reparix')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Supabase connection test failed:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ Supabase connection test successful')
    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Supabase connection error:', error)
    return { success: false, error: error.message }
  }
}

// Insert email into Reparix table
export const insertEmailToReparix = async (email: string): Promise<InsertResult> => {
  try {
    console.log('📧 Inserting email to Reparix table:', email)

    const { data, error } = await supabase
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

  } catch (error: any) {
    console.error('❌ Email insertion error:', error)
    return { 
      success: false, 
      error: error.message || 'Une erreur est survenue lors de l\'inscription'
    }
  }
}

// Get connection status
export const getConnectionStatus = async () => {
  const testResult = await testSupabaseConnection()
  return {
    configured: true,
    connected: testResult.success,
    message: testResult.success ? 'Connected to Supabase' : testResult.error
  }
}