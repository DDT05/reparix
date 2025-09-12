import React, { useState, useEffect } from 'react'
import { testSupabaseConnection, insertEmail } from '../lib/supabase'
import { Button } from './ui/button'
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react'

export const EmailSubscription = ({ compact = false }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  // Test Bolt-Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      console.log('=== BOLT-SUPABASE CONNECTION TEST ===')
      const connected = await testSupabaseConnection()
      setIsConnected(connected)
      console.log('Connection status:', connected)
      console.log('=== END CONNECTION TEST ===')
    }
    
    checkConnection()
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    
    console.log('Form submitted with email:', email)
    
    // Reset previous messages
    setMessage('')
    
    // Validate email
    if (!email || !validateEmail(email)) {
      setStatus('error')
      setMessage('Veuillez entrer une adresse email valide')
      return
    }

    // Check if Bolt-Supabase is connected
    if (!isConnected) {
      setStatus('error')
      setMessage('Service temporairement indisponible. Connexion en cours...')
      console.error('Bolt-Supabase not connected')
      return
    }

    setStatus('loading')
    
    try {
      const result = await insertEmail(email)

      if (!result.success) {
        const error = result.error
        console.error('Email insertion failed:', error)
        
        // Handle specific error cases
        if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
          setStatus('error')
          setMessage('Cette adresse email est déjà inscrite à notre newsletter')
        } else if (error.code === '42501') {
          setStatus('error')
          setMessage('Erreur de permissions. Veuillez réessayer.')
        } else {
          setStatus('error')
          setMessage(`Erreur: ${error.message || 'Service temporairement indisponible'}`)
        }
      } else {
        console.log('Successfully inserted email:', result.data)
        setStatus('success')
        setMessage('Parfait ! Vous êtes maintenant inscrit à notre newsletter Reparix')
        setEmail('')
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      }
    } catch (error) {
      console.error('Unexpected error during subscription:', error)
      setStatus('error')
      setMessage('Une erreur inattendue s\'est produite. Veuillez réessayer.')
    }
  }

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-black"
          disabled={status === 'loading'}
        />
        <Button
          onClick={handleSubmit}
          disabled={status === 'loading' || !isConnected}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          type="button"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            'S\'inscrire'
          )}
        </Button>
        
        {message && (
          <div className={`text-xs mt-1 ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Restez informé
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          Inscrivez-vous pour recevoir les dernières nouvelles et offres spéciales de Reparix
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-black"
            disabled={status === 'loading'}
          />
        </div>
        
        <Button
          type="submit"
          disabled={status === 'loading' || !isConnected}
          className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105 hover:shadow-lg'
          }`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Inscription en cours...
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Inscrit !
            </>
          ) : (
            'S\'inscrire maintenant'
          )}
        </Button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg flex items-start ${
          status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status === 'success' ? (
            <Check className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 mt-0.5" />
          )}
          <span className="text-sm">{message}</span>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-4">
        En vous inscrivant, vous acceptez de recevoir nos emails marketing. 
        Vous pouvez vous désinscrire à tout moment.
      </p>
    </div>
  )
}