const igTiles = [
  { gradient: 'from-rose-200 via-pink-300 to-fuchsia-200', emoji: '🌹' },
  { gradient: 'from-fuchsia-200 via-pink-200 to-rose-100', emoji: '🎁' },
  { gradient: 'from-pink-100 via-fuchsia-100 to-purple-200', emoji: '🕯️' },
  { gradient: 'from-rose-100 via-pink-200 to-fuchsia-300', emoji: '🌿' },
  { gradient: 'from-fuchsia-100 via-pink-100 to-rose-200', emoji: '✨' },
]

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-24 px-6 bg-cream">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <p className="text-clay text-sm font-semibold uppercase tracking-widest mb-3">Follow Along</p>
        <h2 className="font-serif italic text-4xl md:text-5xl text-bark font-bold mb-4">
          @giftdrift.k
        </h2>
        <p className="text-bark/60 text-base mb-6 max-w-md mx-auto">
          Follow us on Instagram for daily gift inspiration, behind-the-scenes magic, and exclusive offers.
        </p>
        <a
          href="https://www.instagram.com/giftdrift.k/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-clay font-semibold border-b-2 border-clay pb-0.5 hover:text-bark hover:border-bark transition-colors duration-200 mb-12 text-lg"
        >
          @giftdrift.k ↗
        </a>

        {/* Photo grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {igTiles.map((tile, i) => (
            <a
              key={i}
              href="https://www.instagram.com/giftdrift.k/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                aspect-square rounded-xl bg-gradient-to-br ${tile.gradient}
                flex items-center justify-center text-4xl
                hover:scale-105 hover:shadow-xl hover:shadow-clay/20
                transition-all duration-300 overflow-hidden relative group
              `}
            >
              <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                {tile.emoji}
              </span>
              <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-2xl">↗</span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow button */}
        <a
          href="https://www.instagram.com/giftdrift.k/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-bark to-bark-dark text-cream px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:shadow-bark/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow on Instagram
        </a>
      </div>
    </section>
  )
}
