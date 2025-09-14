import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance monitoring
const startTime = performance.now()

// Remove loading screen when React app loads
const removeLoadingScreen = () => {
  const loadTime = Math.round(performance.now() - startTime)
  console.log(`🚀 Reparix loaded in ${loadTime}ms`)
  
  const loadingScreen = document.querySelector('.loading-screen')
  if (loadingScreen) {
    loadingScreen.style.opacity = '0'
    loadingScreen.style.transition = 'opacity 0.3s ease'
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen)
      }
    }, 300)
  }
}

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  
  // Remove loading screen after app mounts
  setTimeout(removeLoadingScreen, 100)
} else {
  console.error('Root element not found')
}
