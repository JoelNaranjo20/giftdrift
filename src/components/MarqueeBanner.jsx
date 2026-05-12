const marqueeItems = [
  'Gift Boxes', 'Floral Bouquets', 'Scented Candles', 'Luxury Sets',
  'Birthday Surprises', 'Romance Kits', 'Self-Care Bundles', 'Seasonal Collections',
  'Sweet Treats', 'Handmade Crafts', 'Personalized Gifts', 'Celebration Packs',
]

const separator = <span className="text-blush mx-4 text-lg select-none">✦</span>

export default function MarqueeBanner() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="py-4 overflow-hidden" style={{ background: 'linear-gradient(90deg, #2d0018, #4a0028, #2d0018)' }}>
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center text-cream text-sm font-semibold uppercase tracking-widest">
            {item}
            {separator}
          </span>
        ))}
      </div>
    </div>
  )
}
