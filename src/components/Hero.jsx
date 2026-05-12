// 3 carefully placed cards so they don't cover the video face
const floatingCards = [
  {
    emoji: '🌸',
    label: 'Floral Arrangements',
    color: 'from-pink-100 to-rose-200',
    style: { top: '6%', left: '-18px', rotate: '-4deg', zIndex: 20 },
    anim: 'animate-float',
  },
  {
    emoji: '🎁',
    label: 'Premium Gift Boxes',
    color: 'from-fuchsia-100 to-pink-200',
    style: { top: '34%', left: '-28px', rotate: '3deg', zIndex: 30 },
    anim: 'animate-float-delay',
  },
  {
    emoji: '💝',
    label: 'Romantic Sets',
    color: 'from-rose-100 to-pink-300',
    style: { top: '62%', left: '-14px', rotate: '-2deg', zIndex: 20 },
    anim: 'animate-float-delay2',
  },
]

const trustItems = [
  { icon: '🎀', text: 'Free Wrapping' },
  { icon: '🎁', text: 'Handpicked' },
  { icon: '🌸', text: 'Fast Delivery' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-cream via-blush/20 to-cream flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="flex flex-col gap-8 animate-fade-in-up">
          <h1 className="font-serif italic text-5xl md:text-6xl xl:text-7xl font-bold text-bark leading-tight">
            Gifts That Feel Like{' '}
            <span className="text-gradient">Pure Magic</span>
          </h1>

          <p className="text-bark/65 text-lg md:text-xl leading-relaxed max-w-md font-light">
            Every gift tells a story. We craft beautiful, heartfelt packages
            that turn any moment into a cherished memory.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#shop"
              className="bg-bark text-cream px-8 py-3.5 rounded-full font-semibold text-base hover:bg-bark-dark transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-bark/30"
            >
              Explore the Shop
            </a>
            <a
              href="https://www.instagram.com/giftdrift.k/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-bark text-bark px-8 py-3.5 rounded-full font-semibold text-base hover:bg-bark hover:text-cream transition-all duration-300 hover:-translate-y-1"
            >
              @giftdrift.k ↗
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 pt-2">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-bark/70">
                <span className="text-clay">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Video with floating cards around its left edge */}
        <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] mt-10 lg:mt-0 ml-2 md:ml-0">

          {/* Video container — takes full right column */}
          <div
            className="absolute inset-0 ml-8 md:ml-10 overflow-hidden rounded-[2rem] shadow-2xl shadow-blush/40"
            style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #ffe4ee 100%)' }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain opacity-95"
              style={{ transform: 'translateY(-8%)' }}
            >
              <source src="/deevid-gen-asset-115940441.mp4" type="video/mp4" />
            </video>
            {/* Soft vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blush/10 pointer-events-none rounded-[2rem]" />
          </div>

          {/* Floating cards — anchored to left edge of the video box */}
          {floatingCards.map((card) => (
            <div
              key={card.label}
              className={`absolute ${card.anim} bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/80 px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3 w-[150px] md:w-44 cursor-default hover:scale-105 hover:shadow-2xl transition-transform duration-300 z-40`}
              style={{ top: card.style.top, left: card.style.left, rotate: card.style.rotate }}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-lg md:text-xl flex-shrink-0`}>
                {card.emoji}
              </div>
              <span className="text-bark text-[10px] md:text-xs font-semibold leading-snug">{card.label}</span>
            </div>
          ))}

          {/* Decorative glow blobs */}
          <div className="absolute -bottom-4 right-4 w-32 h-32 bg-clay/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-6 left-0 w-20 h-20 bg-blush/50 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
