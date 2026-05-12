import { useState, useEffect, lazy, Suspense } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeBanner from './components/MarqueeBanner'
import CartDrawer from './components/CartDrawer'

// Lazy load everything below the fold + Admin
const ShopByOccasion = lazy(() => import('./components/ShopByOccasion'))
const BestsellingProducts = lazy(() => import('./components/BestsellingProducts'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const InstagramSection = lazy(() => import('./components/InstagramSection'))
const Footer = lazy(() => import('./components/Footer'))
const Admin = lazy(() => import('./components/Admin'))
const WhatsAppFloat = lazy(() => import('./components/WhatsAppFloat'))

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center text-bark/50 font-medium tracking-widest uppercase">Cargando Panel...</div>}>
        <Admin />
      </Suspense>
    )
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream font-sans">
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <MarqueeBanner />
          <Suspense fallback={<div className="h-32 flex items-center justify-center text-bark/50 font-medium tracking-widest uppercase">Cargando...</div>}>
            <ShopByOccasion />
            <BestsellingProducts />
            <WhyUs />
            <Testimonials />
            <InstagramSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppFloat />
        </Suspense>
      </div>
    </CartProvider>
  )
}
