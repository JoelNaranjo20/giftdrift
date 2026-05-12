import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeBanner from './components/MarqueeBanner'
import ShopByOccasion from './components/ShopByOccasion'
import BestsellingProducts from './components/BestsellingProducts'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import InstagramSection from './components/InstagramSection'
import Footer from './components/Footer'
import Admin from './components/Admin'
import CartDrawer from './components/CartDrawer'

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
    return <Admin />
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream font-sans">
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <MarqueeBanner />
          <ShopByOccasion />
          <BestsellingProducts />
          <WhyUs />
          <Testimonials />
          <InstagramSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
