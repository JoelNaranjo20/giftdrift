const footerLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'About', href: '#about' },
  { label: 'Instagram', href: 'https://www.instagram.com/giftdrift.k/', external: true },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-bark-dark text-cream py-16 px-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-clay/5 rounded-full translate-x-32 -translate-y-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blush/5 rounded-full -translate-x-24 translate-y-24 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#hero" className="inline-block hover:opacity-80 transition-opacity duration-200">
              <img
                src="/logo_urdu.png"
                alt="giftdrift.k logo"
                className="h-24 w-auto object-contain drop-shadow-lg"
              />
            </a>
            <p className="text-blush/50 text-sm mt-2 max-w-xs leading-relaxed">
              Curated gifts that feel like pure magic — wrapped with love, delivered with care.
            </p>
            <a
              href="https://www.instagram.com/giftdrift.k/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-clay hover:text-blush transition-colors text-sm font-medium mt-4"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @giftdrift.k
            </a>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-blush/60 hover:text-cream text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-bark/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blush/40">
          <div className="flex gap-4 items-center">
            <p>© {new Date().getFullYear()} giftdrift.k — All rights reserved.</p>
            <a href="#admin" className="hover:text-cream transition-colors">Admin</a>
          </div>
          <p>Made with ♡ for gift lovers everywhere</p>
        </div>
      </div>
    </footer>
  )
}
