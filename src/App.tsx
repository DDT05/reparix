import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated, config } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'
import styled from 'styled-components'
import { Button } from './components/ui/button'
import { EmailSubscription } from './components/EmailSubscription'
import { LazyImage } from './components/LazyImage'
import { Star, Check, ArrowRight, ChevronLeft, ChevronRight, Menu, X, Wrench, Shield, Clock, Users, Quote, Zap, Award, TrendingUp } from 'lucide-react'
import './App.css'

// Styled Components
const GradientBackground = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%);
  }
`

const FloatingCard = styled(motion.div)`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`

const PulsingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #10b981, #34d399);
  filter: blur(1px);
`

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('diagnostics')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const slides = [
    {
      title: "Diagnostiquez les voyants moteur",
      description: "Évitez le garage et diagnostiquez plus de 7 000 problèmes automobiles en quelques secondes sur votre téléphone.",
      image: "/hand.gif"
    },
    {
      title: "Recevez des alertes de maintenance",
      description: "Ne manquez plus jamais une vidange, une rotation des pneus ou un entretien important.",
      image: "/keys.gif"
    },
    {
      title: "Économisez des milliers d'euros au garage",
      description: "Sachez ce qui ne va pas avant d'aller chez le mécanicien et évitez de vous faire arnaquer.",
      image: "/plug.gif"
    }
  ]

  // Intersection Observer hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [reviewsRef, reviewsInView] = useInView({ threshold: 0.2, triggerOnce: true })

  // Spring animations
  const heroSpring = useSpring({
    opacity: heroInView ? 1 : 0,
    transform: heroInView ? 'translateY(0px)' : 'translateY(50px)',
    config: config.gentle
  })

  const statsSpring = useSpring({
    number: heroInView ? 1000 : 0,
    config: config.molasses
  })

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating orbs */}
      <PulsingOrb
        className="w-64 h-64 -top-32 -left-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <PulsingOrb
        className="w-96 h-96 -bottom-48 -right-48"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header */}
      <motion.header 
        className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 text-white py-4 px-4 sticky top-0 z-50 backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wrench className="w-8 h-8 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Reparix
              </span>
            </div>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {['Fonctionnalités', 'Comment ça marche', 'À propos', 'Newsletter'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-green-200 transition-colors relative"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-200"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>
            <FloatingCard
              className="rounded-lg p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <EmailSubscription compact={true} />
            </FloatingCard>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-green-500"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav 
                className="flex flex-col space-y-3 mt-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {['Fonctionnalités', 'Comment ça marche', 'À propos', 'Newsletter'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-green-200 transition-colors py-2"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.div 
                  className="bg-white rounded-lg p-4 mt-4"
                  variants={itemVariants}
                >
                  <EmailSubscription compact={true} />
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative">
        <GradientBackground className="py-20 px-4">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <animated.div style={heroSpring} className="space-y-8">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Le scanner de réparation automobile qui fait économiser{' '}
                  <motion.span 
                    className="text-yellow-300 relative"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(255,255,0,0.5)",
                        "0 0 20px rgba(255,255,0,0.8)",
                        "0 0 10px rgba(255,255,0,0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    des milliers d'euros
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-green-50 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Décodez instantanément votre voyant moteur et économisez des milliers d'euros au garage. 
                  De plus, recevez des alertes de maintenance automatiques pour les vidanges, rotations de pneus, 
                  et plus encore directement sur votre téléphone !
                </motion.p>
                
                <motion.p 
                  className="text-sm text-green-100 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
                </motion.p>
                
                <FloatingCard
                  className="p-6 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <EmailSubscription />
                </FloatingCard>
                
                {/* Enhanced Guarantee Badge */}
                <motion.div 
                  className="flex items-center justify-center lg:justify-start space-x-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                    <motion.div 
                      className="bg-gradient-to-br from-white to-green-50 rounded-full p-6 shadow-2xl"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      }}
                      animate={{
                        boxShadow: [
                          "0 10px 25px rgba(0, 0, 0, 0.15)",
                          "0 15px 35px rgba(0, 0, 0, 0.25)",
                          "0 10px 25px rgba(0, 0, 0, 0.15)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">Garantie satisfait</div>
                        <div className="text-sm text-gray-600">ou remboursé</div>
                        <motion.div 
                          className="text-2xl font-bold text-green-500"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ★
                        </motion.div>
                      </div>
                    </motion.div>
                  </Tilt>
                </motion.div>
              </animated.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                  <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
                    <motion.img 
                      src="/product_img.gif" 
                      alt="Produit Reparix" 
                      className="w-full h-64 object-contain rounded-2xl shadow-2xl" 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </Tilt>
                  <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
                    <motion.img 
                      src="/Design_sans_titre__2_-removebg-preview.png" 
                      alt="Tableau de bord avec port OBD2" 
                      className="w-full h-64 object-contain rounded-2xl shadow-2xl" 
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </Tilt>
                </div>
                
                {/* Enhanced floating elements */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, 10, 0],
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </div>
            
            {/* Enhanced Reviews and Sales Stats */}
            <motion.div 
              className="text-center mt-20 space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="flex justify-center items-center space-x-4">
                <motion.span 
                  className="text-2xl md:text-4xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
                >
                  +<animated.span>
                    {statsSpring.number.to(n => Math.floor(n))}
                  </animated.span> Avis étoilés
                </motion.span>
              </div>
              
              <motion.div 
                className="flex justify-center space-x-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="text-xl md:text-3xl font-bold text-yellow-300 italic"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 10px rgba(255,255,0,0.3)",
                    "0 0 20px rgba(255,255,0,0.6)",
                    "0 0 10px rgba(255,255,0,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Plusieurs centaines de capteurs Reparix vendus !
              </motion.div>
            </motion.div>
          </div>
        </GradientBackground>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Pourquoi chaque conducteur devrait posséder un capteur Reparix
          </motion.h2>
          
          {/* Enhanced Feature Tabs */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 shadow-lg overflow-x-auto">
              {[
                { id: 'diagnostics', label: 'Diagnostic Auto', icon: Zap },
                { id: 'maintenance', label: 'Alertes Maintenance', icon: Clock },
                { id: 'severity', label: 'Gravité des Problèmes', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <motion.button 
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-6 py-4 text-base rounded-xl font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === id 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-green-600 mb-6"
                layoutId="tab-title"
              >
                {activeTab === 'diagnostics' && "Traduisez plus de 7000 codes d'erreur en termes simples,"}
                {activeTab === 'maintenance' && "Ne manquez plus jamais un entretien important,"}
                {activeTab === 'severity' && "Connaissez l'urgence de vos problèmes automobiles,"}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg md:text-xl"
                layoutId="tab-description"
              >
                {activeTab === 'diagnostics' && "éliminant le stress du voyant moteur."}
                {activeTab === 'maintenance' && "avec des alertes automatiques envoyées directement sur votre téléphone."}
                {activeTab === 'severity' && "pour prioriser les réparations et rester en sécurité."}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 p-8 rounded-3xl mb-8 shadow-xl border border-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.p 
              className="text-lg font-semibold mb-6 text-gray-800"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{
                background: "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6, #10b981)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Toutes ces fonctionnalités sont incluses GRATUITEMENT dans l'application Reparix lorsque vous achetez un capteur Reparix. 
              Il n'y a pas de limite au nombre de fois que vous pouvez utiliser le capteur et vous pouvez le connecter à tous les véhicules de votre famille.
            </motion.p>
            <motion.p 
              className="font-bold text-green-600 text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Compatible avec tous les appareils iOS et Android.
            </motion.p>
          </motion.div>

          <motion.p 
            className="text-sm text-gray-600 italic"
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
          </motion.p>
        </div>
      </section>

      {/* Enhanced Compatibility Section */}
      <section className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-16 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          style={{
            background: "radial-gradient(circle, #10b981 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl"
              whileHover={{ scale: 1.05 }}
            >
              Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
            </motion.p>
            <motion.div 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              1996+
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How Reparix Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comment fonctionne Reparix
          </motion.h2>
          
          {/* Enhanced Video Demo Section */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Regardez Reparix en action
              </motion.h3>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <motion.div 
                  className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full mx-auto">
                    <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                      <iframe 
                        src="https://player.vimeo.com/video/1117772505?badge=0&autopause=0&player_id=0&app_id=58479" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                        title="Démonstration Reparix"
                        className="rounded-2xl shadow-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              </Tilt>
              <motion.p 
                className="text-center text-lg text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Découvrez comment utiliser Reparix en moins de 2 minutes
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Branchez Reparix",
                description: "Chaque voiture construite en 1996 ou après possède ce port (OBD2) sous le tableau de bord côté conducteur. C'est le même port que les mécaniciens utilisent pour diagnostiquer les problèmes automobiles.",
                image: "/plug.gif",
                color: "from-blue-500 to-purple-600"
              },
              {
                step: "2", 
                title: "Démarrez votre moteur",
                description: "Téléchargez l'application Reparix et démarrez votre moteur. Le capteur Reparix se connecte facilement à votre smartphone via Bluetooth.",
                image: "/keys.gif",
                color: "from-green-500 to-teal-600"
              },
              {
                step: "3",
                title: "Appuyez pour scanner", 
                description: "Ouvrez l'application et appuyez sur \"scanner\" pour décoder instantanément votre voyant moteur et surveiller la santé de votre voiture en temps réel.",
                image: "/hand.gif",
                color: "from-orange-500 to-red-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="mb-8 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}
                    animate={{
                      boxShadow: [
                        "0 10px 25px rgba(0,0,0,0.15)",
                        "0 20px 40px rgba(0,0,0,0.25)",
                        "0 10px 25px rgba(0,0,0,0.15)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.step}
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-xl md:text-2xl font-bold mb-6 text-gray-900"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.step}. {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  whileHover={{ color: "#374151" }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section ref={reviewsRef} className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600" 
               style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-20 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ce que disent nos clients
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={reviewsInView ? "visible" : "hidden"}
          >
            {[
              {
                quote: "Reparix m'a fait économiser plus de 800€ ! Mon mécanicien voulait changer tout le système, mais grâce à Reparix j'ai découvert que c'était juste un capteur défaillant.",
                name: "Marie Dubois",
                location: "Paris, France",
                initial: "M",
                color: "from-pink-500 to-rose-600"
              },
              {
                quote: "Fantastique ! Plus jamais de stress avec le voyant moteur. Je sais exactement ce qui ne va pas avant même d'aller chez le garagiste.",
                name: "Pierre Martin", 
                location: "Lyon, France",
                initial: "P",
                color: "from-blue-500 to-indigo-600"
              },
              {
                quote: "Les alertes de maintenance sont géniales ! Je n'oublie plus jamais ma vidange. Un investissement qui se rentabilise rapidement.",
                name: "Sophie Leroy",
                location: "Marseille, France", 
                initial: "S",
                color: "from-green-500 to-emerald-600"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Quote className="w-10 h-10 text-green-600 mr-4" />
                    </motion.div>
                    <motion.div 
                      className="flex space-x-1"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          variants={itemVariants}
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  <motion.p 
                    className="text-gray-700 mb-6 italic text-lg leading-relaxed"
                    whileHover={{ scale: 1.02 }}
                  >
                    "{review.quote}"
                  </motion.p>
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-br ${review.color} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="font-bold text-white text-lg">{review.initial}</span>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="font-semibold text-gray-900"
                        whileHover={{ scale: 1.05 }}
                      >
                        {review.name}
                      </motion.p>
                      <p className="text-sm text-gray-600">{review.location}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={reviewsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-100 to-blue-100 px-8 py-4 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.1)",
                  "0 8px 25px rgba(0,0,0,0.15)",
                  "0 4px 15px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              </motion.div>
              <span className="font-bold text-green-800 text-lg">4.9/5 étoiles</span>
              <span className="text-green-600">• Plus de 1000 avis vérifiés</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Money Saving Features Carousel */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-green-500 to-transparent" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-20 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Voici comment Reparix vous fait économiser de l'argent
          </motion.h2>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <motion.button 
                onClick={prevSlide}
                className="absolute left-4 z-10 p-4 bg-gradient-to-r from-white to-gray-50 rounded-full shadow-2xl hover:shadow-3xl"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-8 h-8 text-gray-700" />
              </motion.button>
              
              <div className="max-w-3xl text-center px-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                      <motion.div 
                        className="mb-10"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.img 
                          src={slides[currentSlide].image} 
                          alt={slides[currentSlide].title}
                          className="w-64 h-64 mx-auto rounded-3xl object-cover shadow-2xl"
                          animate={{
                            boxShadow: [
                              "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                              "0 35px 70px -12px rgba(0, 0, 0, 0.35)",
                              "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </motion.div>
                    </Tilt>
                    <motion.h3 
                      className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                      layoutId={`title-${currentSlide}`}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                    <motion.p 
                      className="text-lg md:text-xl text-gray-600 leading-relaxed"
                      layoutId={`description-${currentSlide}`}
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <motion.button 
                onClick={nextSlide}
                className="absolute right-4 z-10 p-4 bg-gradient-to-r from-white to-gray-50 rounded-full shadow-2xl hover:shadow-3xl"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-8 h-8 text-gray-700" />
              </motion.button>
            </div>
            
            {/* Enhanced Slide Indicators */}
            <motion.div 
              className="flex justify-center mt-12 space-x-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Email Subscription Section */}
      <section id="newsletter" className="py-20 px-4 relative overflow-hidden">
        <GradientBackground>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Restez connecté avec <motion.span 
                className="text-yellow-300"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,255,0,0.5)",
                    "0 0 20px rgba(255,255,0,0.8)",
                    "0 0 10px rgba(255,255,0,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Reparix
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-green-50 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, conseils d'entretien automobile, 
              et offres spéciales directement dans votre boîte mail.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <EmailSubscription />
            </motion.div>
          </div>
        </GradientBackground>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            À propos de Reparix
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Reparix est basé à Paris, France, et fier d'être une entreprise française. 
            Fondée par une équipe d'ingénieurs passionnés d'automobile qui en avaient assez de voir 
            leurs amis et leur famille se faire arnaquer au garage, Reparix a pour mission d'autonomiser 
            les propriétaires de voitures partout en France pour économiser du temps, de l'argent, 
            et simplifier l'entretien automobile.
          </motion.p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 text-white py-12 px-4 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="flex justify-center items-center space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Wrench className="w-10 h-10 text-white" />
            </motion.div>
            <motion.span 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Reparix
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="mb-2 text-green-100">
              Copyright © 2024, Reparix France. Tous droits réservés. 
              <motion.span 
                className="inline-block mx-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              Fait avec amour à Paris.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App