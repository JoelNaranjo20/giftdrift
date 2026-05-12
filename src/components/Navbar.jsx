import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const navLinks = ['Shop', 'About', 'Instagram']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartItems, setIsCartOpen } = useCart()

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-cream/70 backdrop-blur-md shadow-sm py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? '' : 'py-2'}`}>
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center hover:opacity-90 transition-opacity duration-200"
        >
          <img
            src="/logo_urdu.png"
            alt="giftdrift.k logo"
            className={`w-auto object-contain transition-all duration-500 ease-out ${scrolled ? 'h-14' : 'h-20 drop-shadow-sm'
              }`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={
                link === 'Instagram'
                  ? 'https://www.instagram.com/giftdrift.k/'
                  : `#${link.toLowerCase()}`
              }
              target={link === 'Instagram' ? '_blank' : undefined}
              rel={link === 'Instagram' ? 'noopener noreferrer' : undefined}
              className="text-bark/70 hover:text-clay font-medium text-sm tracking-wide transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-clay transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          {/* Email quick-action */}
          <a
            href="mailto:giftdrift.k@gmail.com"
            className="inline-flex items-center gap-1.5 border border-bark/30 text-bark/70 hover:border-clay hover:text-clay px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 7.5-9.75-7.5" />
            </svg>
            Contact
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-bark text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-bark-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Nav Actions */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-bark hover:text-clay transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-bark transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-bark transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-bark transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } bg-cream/98 backdrop-blur-sm border-t border-blush/30`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={
                link === 'Instagram'
                  ? 'https://www.instagram.com/giftdrift.k/'
                  : `#${link.toLowerCase()}`
              }
              target={link === 'Instagram' ? '_blank' : undefined}
              rel={link === 'Instagram' ? 'noopener noreferrer' : undefined}
              className="text-bark font-medium py-1 hover:text-clay transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:giftdrift.k@gmail.com"
            className="inline-flex items-center justify-center gap-2 border border-bark/30 text-bark px-6 py-2.5 rounded-full text-sm font-medium hover:border-clay hover:text-clay transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 7.5-9.75-7.5" />
            </svg>
            giftdrift.k@gmail.com
          </a>
          <a
            href="#shop"
            className="bg-bark text-cream px-6 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-bark-dark transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </a>
        </div>
      </div>
    </header>
  )
}
