// Supabase integration for Reparix
// This will be configured when user connects to Supabase

let supabase = null

export const initializeSupabase = (supabaseClient) => {
  supabase = supabaseClient
  console.log('Supabase client initialized for Reparix')
}

export const isSupabaseConnected = () => {
  return supabase !== null
}

// Test connection to Reparix table
export const testSupabaseConnection = async () => {
  if (!supabase) {
    console.log('Supabase not connected yet')
    return false
  }

  try {
    console.log('Testing connection to Reparix table...')
    
    const { data, error } = await supabase
      .from('Reparix')
      .select('count', { count: 'exact', head: true })
    
    console.log('Reparix table connection test:', { 
      success: !error, 
      error: error?.message,
      count: data 
    })
    
    return !error
  } catch (err) {
    console.error('Connection test failed:', err)
    return false
  }
}

// Insert email into Reparix table
export const insertEmail = async (email) => {
  if (!supabase) {
    throw new Error('Supabase not connected. Please connect to Supabase first.')
  }

  try {
    console.log('Inserting email into Reparix table:', email)
    
    const { data, error } = await supabase
      .from('Reparix')
      .insert([
        { 
          email: email.toLowerCase().trim()
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