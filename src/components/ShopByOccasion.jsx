import useSWR from 'swr'
import { getOccasions } from '../data/occasions'
const FALLBACK = [
  { id: 1, emoji: '🎂', name: 'Birthdays',  count: '48 items', gradient: 'from-pink-100 to-rose-200',      accent: 'bg-rose-400'   },
  { id: 2, emoji: '💕', name: 'Romance',    count: '36 items', gradient: 'from-red-100 to-pink-200',       accent: 'bg-pink-400'   },
  { id: 3, emoji: '🛁', name: 'Self-Care',  count: '52 items', gradient: 'from-purple-100 to-fuchsia-200', accent: 'bg-purple-400' },
  { id: 4, emoji: '🍂', name: 'Seasonal',   count: '29 items', gradient: 'from-pink-100 to-rose-200',      accent: 'bg-rose-400'   },
]

export default function ShopByOccasion() {
  const { data } = useSWR('occasions', getOccasions, { revalidateOnFocus: false })
  const occasions = data && data.length > 0 ? data : FALLBACK

  return (
    <section id="shop" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-clay text-sm font-semibold uppercase tracking-widest mb-3">Browse By</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-bark font-bold">
            Shop by Occasion
          </h2>
          <div className="mx-auto mt-5 w-20 h-0.5 bg-gradient-to-r from-transparent via-clay to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <a
              key={occ.id}
              href="#"
              className="group relative bg-white rounded-2xl overflow-hidden border border-blush/40 hover:border-clay/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-clay/20"
            >
              {/* Image area */}
              <div className={`bg-gradient-to-br ${occ.gradient} h-40 flex items-center justify-center text-6xl relative overflow-hidden`}>
                <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                  {occ.emoji}
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 relative">
                <h3 className="font-serif text-bark text-xl font-semibold mb-1">{occ.name}</h3>
                <p className="text-bark/50 text-sm">{occ.count}</p>

                {/* Underline accent */}
                <div className={`absolute bottom-0 left-0 h-0.5 ${occ.accent} w-0 group-hover:w-full transition-all duration-500`} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
