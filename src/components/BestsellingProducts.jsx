import { useState } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { getProducts } from '../data/products'
import { useCart } from '../context/CartContext'
function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-blush/40 hover:border-clay/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-clay/15 flex flex-col">
      {/* Image/Video area */}
      <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-cream to-pink-50 flex items-center justify-center overflow-hidden p-2">
        {product.media_type === 'image' ? (
          <img 
            loading="lazy"
            src={product.media_url} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          >
            <source src={product.media_url} type="video/mp4" />
          </video>
        )}

        {/* Badge */}
        <span className={`absolute top-3 left-3 ${product.badge_color || 'bg-clay text-cream'} text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm`}>
          {product.badge}
        </span>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-bark/50 hover:text-rose-500 transition-colors duration-200 shadow-sm z-10">
          ♡
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-bark/20 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-bark text-lg font-semibold leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-bark/50 text-sm leading-snug mb-4 flex-1">{product.subtitle}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-bark font-bold text-xl">{product.price}</span>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-bark text-cream hover:bg-bark-dark hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BestsellingProducts() {
  const { data: products = [], error } = useSWR('products', getProducts, { revalidateOnFocus: false })
  const loading = !products.length && !error


  return (
    <section className="py-24 px-6 bg-gradient-to-b from-cream to-blush/20 overflow-hidden" id="shop">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-clay text-sm font-semibold uppercase tracking-widest mb-3">Our Picks</p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-bark font-bold">
              Bestselling Gifts
            </h2>
          </div>
          <a
            href="#"
            className="text-clay font-semibold text-sm underline underline-offset-4 hover:text-bark transition-colors"
          >
            View all products →
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24 text-clay animate-pulse">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-bark/50">
            No products available.
          </div>
        )}
      </motion.div>
    </section>
  )
}
