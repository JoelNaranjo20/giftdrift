import useSWR from 'swr'
import { getTestimonials } from '../data/testimonials'
export default function Testimonials() {
  const { data: testimonials = [], error } = useSWR('testimonials', getTestimonials, { revalidateOnFocus: false })
  const loading = !testimonials.length && !error

  if (loading || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blush/30 via-cream to-blush/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-clay text-sm font-semibold uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-bark font-bold">
            What Our Customers Say
          </h2>
          <div className="mx-auto mt-5 w-20 h-0.5 bg-gradient-to-r from-transparent via-clay to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-blush/50 hover:border-clay/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-clay/10 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, si) => (
                  <span key={si} className="text-clay text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif italic text-bark/80 text-base leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-blush/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush to-clay flex items-center justify-center text-cream font-bold text-sm">
                  {t.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="text-bark font-semibold text-sm">{t.name}</p>
                  <p className="text-bark/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
