const features = [
  {
    emoji: '🎀',
    title: 'Beautiful Wrapping',
    desc: 'Every order arrives lovingly wrapped with premium ribbon, tissue paper, and a handwritten card — ready to gift straight from the box.',
  },
  {
    emoji: '✦',
    title: 'Thoughtfully Curated',
    desc: 'We spend hours sourcing and testing each item to ensure only the finest, most meaningful gifts make it into our collection.',
  },
  {
    emoji: '💌',
    title: 'Personal Touch',
    desc: 'From custom messages to bespoke arrangements, every order reflects the love and intention you want to share with someone special.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d0018 0%, #4a0028 50%, #1a000f 100%)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-clay/20 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blush/10 rounded-full translate-x-32 translate-y-32 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-clay/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-clay text-sm font-semibold uppercase tracking-widest mb-3">Why Us</p>
          <h2 className="font-serif italic text-4xl md:text-5xl text-cream font-bold">
            The giftdrift.k Difference
          </h2>
          <div className="mx-auto mt-5 w-20 h-0.5 bg-gradient-to-r from-transparent via-clay to-transparent" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group border border-clay/20 hover:border-clay/60 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-clay/20"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transition-colors duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(233,30,142,0.25), rgba(255,182,193,0.15))' }}
              >
                {feat.emoji}
              </div>
              <h3 className="font-serif text-cream text-xl font-semibold mb-4">{feat.title}</h3>
              <p className="text-blush/70 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
