import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { EmailSubscription } from './components/EmailSubscription'
import { Star, Check, ArrowRight, ChevronLeft, ChevronRight, Menu, X, Wrench, Shield, Clock, Users, Quote } from 'lucide-react'
import './App.css'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('diagnostics')
  
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Wrench className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold">Reparix</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#features" className="hover:text-green-200 transition-colors">Fonctionnalités</a>
              <a href="#how-it-works" className="hover:text-green-200 transition-colors">Comment ça marche</a>
              <a href="#about" className="hover:text-green-200 transition-colors">À propos</a>
              <a href="#newsletter" className="hover:text-green-200 transition-colors">Newsletter</a>
            </nav>
            <div className="bg-white rounded-lg p-2">
              <EmailSubscription compact={true} />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-500">
            <nav className="flex flex-col space-y-3 mt-4">
              <a href="#features" className="hover:text-green-200 transition-colors py-2">Fonctionnalités</a>
              <a href="#how-it-works" className="hover:text-green-200 transition-colors py-2">Comment ça marche</a>
              <a href="#about" className="hover:text-green-200 transition-colors py-2">À propos</a>
              <a href="#newsletter" className="hover:text-green-200 transition-colors py-2">Newsletter</a>
              <div className="bg-white rounded-lg p-4 mt-4">
                <EmailSubscription compact={true} />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Le scanner de réparation automobile qui fait économiser{' '}
                <span className="text-green-600 animate-pulse">des milliers d'euros</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Décodez instantanément votre voyant moteur et économisez des milliers d'euros au garage. 
                De plus, recevez des alertes de maintenance automatiques pour les vidanges, rotations de pneus, 
                et plus encore directement sur votre téléphone !
              </p>
              <p className="text-xs md:text-sm text-gray-600 italic">
                Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
              </p>
              
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <EmailSubscription />
              </div>
              
              {/* Money Back Guarantee Badge */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 mt-6 md:mt-8">
                <div className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-xs font-semibold">Garantie satisfait</div>
                    <div className="text-xs">ou remboursé</div>
                    <div className="text-lg font-bold text-green-500">★</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10">
                <img 
                  src="/product_img.gif" 
                  alt="Produit Reparix" 
                  className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500" 
                />
                <img 
                  src="/Design_sans_titre__2_-removebg-preview.png" 
                  alt="Tableau de bord avec port OBD2" 
                  className="w-full h-48 sm:h-56 md:h-64 object-contain rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500" 
                />
              </div>
              {/* Floating elements for visual interest */}
              <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-bounce"></div>
              <div className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-200 rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>
          
          {/* Reviews and Sales Stats */}
          <div className="text-center mt-8 md:mt-16 space-y-4 md:space-y-6 animate-fade-in-up">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-lg md:text-2xl lg:text-3xl font-bold">+1000 Avis étoilés</span>
            </div>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 md:w-6 md:h-6 fill-green-400 text-green-400 animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="text-lg md:text-2xl lg:text-3xl font-bold text-green-600 italic animate-bounce">
              Plusieurs centaines de capteurs Reparix vendus !
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-8 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 animate-fade-in-up">
            Pourquoi chaque conducteur devrait posséder un capteur Reparix
          </h2>
          
          {/* Feature Tabs */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'diagnostics' 
                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                Diagnostic Auto
              </button>
              <button 
                onClick={() => setActiveTab('maintenance')}
                className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'maintenance' 
                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                Alertes Maintenance
              </button>
              <button 
                onClick={() => setActiveTab('severity')}
                className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === 'severity' 
                    ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                Gravité des Problèmes
              </button>
            </div>
          </div>

          <div className="mb-12 animate-fade-in-up">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-600 mb-4">
              {activeTab === 'diagnostics' && "Traduisez plus de 7000 codes d'erreur en termes simples,"}
              {activeTab === 'maintenance' && "Ne manquez plus jamais un entretien important,"}
              {activeTab === 'severity' && "Connaissez l'urgence de vos problèmes automobiles,"}
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              {activeTab === 'diagnostics' && "éliminant le stress du voyant moteur."}
              {activeTab === 'maintenance' && "avec des alertes automatiques envoyées directement sur votre téléphone."}
              {activeTab === 'severity' && "pour prioriser les réparations et rester en sécurité."}
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8 rounded-xl mb-6 md:mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-base md:text-lg font-semibold mb-4">
              Toutes ces fonctionnalités sont incluses GRATUITEMENT dans l'application Reparix lorsque vous achetez un capteur Reparix. 
              Il n'y a pas de limite au nombre de fois que vous pouvez utiliser le capteur et vous pouvez le connecter à tous les véhicules de votre famille.
            </p>
            <p className="font-bold text-green-600">Compatible avec tous les appareils iOS et Android.</p>
          </div>

          <p className="text-xs md:text-sm text-gray-600 italic">
            Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
          </p>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="bg-green-100 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-base md:text-lg text-gray-700 text-center">
              Reparix fonctionne avec toutes les voitures à essence construites après 1996 et les diesels construits après 2008.
            </p>
            <div className="text-4xl md:text-6xl font-bold text-gray-800">1996+</div>
          </div>
        </div>
      </section>

      {/* How Reparix Works Section */}
      <section id="how-it-works" className="py-8 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-16">
            Comment fonctionne Reparix
          </h2>
          
          {/* Video Demo Section */}
          <div className="mb-12 md:mb-16">
            <div className="max-w-lg md:max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
                Regardez Reparix en action
              </h3>
              <div className="bg-gray-100 rounded-xl p-4 md:p-8 shadow-lg">
                <div className="w-full mx-auto">
                  <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
                    <iframe 
                      src="https://player.vimeo.com/video/1117772505?badge=0&autopause=0&player_id=0&app_id=58479" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
                      title="Démonstration Reparix"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm md:text-base text-gray-600 mt-4">
                Découvrez comment utiliser Reparix en moins de 2 minutes
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <img src="/plug.gif" alt="Branchez Reparix" className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">1. Branchez Reparix</h3>
              <p className="text-sm md:text-base text-gray-600">
                Chaque voiture construite en 1996 ou après possède ce port (OBD2) sous le tableau de bord côté conducteur. 
                C'est le même port que les mécaniciens utilisent pour diagnostiquer les problèmes automobiles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <img src="/keys.gif" alt="Démarrez votre moteur" className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">2. Démarrez votre moteur</h3>
              <p className="text-sm md:text-base text-gray-600">
                Téléchargez l'application Reparix et démarrez votre moteur. Le capteur Reparix se connecte 
                facilement à votre smartphone via Bluetooth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <img src="/hand.gif" alt="Appuyez pour scanner" className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">3. Appuyez pour scanner</h3>
              <p className="text-sm md:text-base text-gray-600">
                Ouvrez l'application et appuyez sur "scanner" pour décoder instantanément votre voyant moteur 
                et surveiller la santé de votre voiture en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-8 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-16">
            Ce que disent nos clients
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-green-600 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4 italic">
                "Reparix m'a fait économiser plus de 800€ ! Mon mécanicien voulait changer tout le système, 
                mais grâce à Reparix j'ai découvert que c'était juste un capteur défaillant."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-800">M</span>
                </div>
                <div>
                  <p className="font-semibold">Marie Dubois</p>
                  <p className="text-sm text-gray-600">Paris, France</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-green-600 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4 italic">
                "Fantastique ! Plus jamais de stress avec le voyant moteur. Je sais exactement ce qui ne va pas 
                avant même d'aller chez le garagiste."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-800">P</span>
                </div>
                <div>
                  <p className="font-semibold">Pierre Martin</p>
                  <p className="text-sm text-gray-600">Lyon, France</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-green-600 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 mb-4 italic">
                "Les alertes de maintenance sont géniales ! Je n'oublie plus jamais ma vidange. 
                Un investissement qui se rentabilise rapidement."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-800">S</span>
                </div>
                <div>
                  <p className="font-semibold">Sophie Leroy</p>
                  <p className="text-sm text-gray-600">Marseille, France</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full">
              <Star className="w-5 h-5 fill-green-500 text-green-500" />
              <span className="font-semibold text-green-800">4.9/5 étoiles</span>
              <span className="text-green-600">• Plus de 1000 avis vérifiés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Money Saving Features Carousel */}
      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-16">
            Voici comment Reparix vous fait économiser de l'argent
          </h2>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="max-w-2xl text-center px-12 md:px-0">
                <div className="mb-8">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-lg object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-4">{slides[currentSlide].title}</h3>
                <p className="text-base md:text-lg text-gray-600">{slides[currentSlide].description}</p>
              </div>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Section */}
      <section id="newsletter" className="py-8 md:py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Restez connecté avec <span className="text-green-600">Reparix</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, conseils d'entretien automobile, 
            et offres spéciales directement dans votre boîte mail.
          </p>
          
          <EmailSubscription />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 md:py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">À propos de Reparix</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Reparix est basé à Paris, France, et fier d'être une entreprise française. 
            Fondée par une équipe d'ingénieurs passionnés d'automobile qui en avaient assez de voir 
            leurs amis et leur famille se faire arnaquer au garage, Reparix a pour mission d'autonomiser 
            les propriétaires de voitures partout en France pour économiser du temps, de l'argent, 
            et simplifier l'entretien automobile.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Wrench className="w-8 h-8 text-white" />
            <span className="text-xl md:text-2xl font-bold">Reparix</span>
          </div>
          
          <div className="text-center text-sm">
            <p className="mb-2">Copyright © 2024, Reparix France. Tous droits réservés. Fait avec ❤️ à Paris.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App