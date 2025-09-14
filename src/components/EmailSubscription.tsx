import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, config } from 'react-spring'
import { 
  insertEmailToReparix, 
} from '../lib/supabaseService'
import { Button } from './ui/button'
import { Mail, Check, AlertCircle } from 'lucide-react'

interface EmailSubscriptionProps {
  compact?: boolean
}

export const EmailSubscription: React.FC<EmailSubscriptionProps> = ({ compact = false }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Spring animation for the form
  const formSpring = useSpring({
    transform: status === 'success' ? 'scale(1.05)' : 'scale(1)',
    config: config.gentle
  })

  // Spring animation for the button
  const buttonSpring = useSpring({
    backgroundColor: status === 'success' ? '#10b981' : '#059669',
    config: config.gentle
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Veuillez entrer une adresse email valide')
      return
    }

    setStatus('loading')
    setMessage('')
    
    try {
      const result = await insertEmailToReparix(email)
      
      if (result.success) {
        setStatus('success')
        setMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(result.error)
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (compact) {
    return (
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-black"
            disabled={status === 'loading'}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
            onClick={handleSubmit}
            disabled={status === 'loading' || status === 'success'}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              status === 'success' 
                ? 'bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto' 
                : 'bg-green-600 hover:bg-green-700 text-white disabled:opacity-50'
            }`}
          >
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                  />
                ) : status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    S'inscrire
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
        <AnimatePresence>
          {message && (
            <motion.div 
              className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <animated.div 
      style={formSpring}
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-lg mx-auto backdrop-blur-lg border border-white/20"
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          whileHover={{ 
            scale: 1.1, 
            rotate: 360,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Mail className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
        </motion.div>
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Restez informé
        </motion.h3>
        <motion.p 
          className="text-base md:text-lg text-gray-600 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Inscrivez-vous pour recevoir les dernières nouvelles et offres spéciales de Reparix
        </motion.p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black text-lg shadow-sm"
            disabled={status === 'loading'}
            whileFocus={{ scale: 1.02, borderColor: "#10b981" }}
          />
        </div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <animated.div style={buttonSpring}>
            <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 text-lg md:text-xl font-bold rounded-xl transition-all duration-300 shadow-lg ${
            status === 'success' 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-2xl' 
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-2xl disabled:opacity-50'
          }`}
        >
              <AnimatePresence mode="wait">
                {status === 'loading' && (
                  <motion.div
                    key="loading"
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Inscription...</span>
                  </motion.div>
                )}
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-6 h-6 mr-3" />
                    <span>Inscrit !</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    S'inscrire maintenant
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </animated.div>
        </motion.div>
      </motion.form>

      <AnimatePresence>
        {message && (
          <motion.div 
            className={`mt-6 p-4 rounded-xl flex items-start shadow-lg ${
          status === 'success' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-2 border-red-200'
        }`}>
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: status === 'success' ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {status === 'success' ? (
                <Check className="w-5 h-5 md:w-6 md:h-6 mr-3 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 mr-3 flex-shrink-0 mt-0.5" />
              )}
            </motion.div>
            <span className="text-sm md:text-base font-medium">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p 
        className="text-sm text-gray-500 text-center mt-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        En vous inscrivant, vous acceptez de recevoir nos emails marketing. 
        Vous pouvez vous désinscrire à tout moment.
      </motion.p>
    </animated.div>
  )
}