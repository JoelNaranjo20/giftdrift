import { useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { getProducts, saveProducts, deleteProduct } from '../data/products'
import { getTestimonials, saveTestimonials, deleteTestimonial } from '../data/testimonials'
import { getOccasions, saveOccasions, deleteOccasion } from '../data/occasions'
import { supabase } from '../lib/supabase'

const OCCASION_PALETTES = [
  { label: 'Rose',      gradient: 'from-pink-100 to-rose-200',       accent: 'bg-rose-400',    preview: 'linear-gradient(135deg,#fce7f3,#fecdd3)' },
  { label: 'Pink',      gradient: 'from-red-100 to-pink-200',        accent: 'bg-pink-400',    preview: 'linear-gradient(135deg,#fee2e2,#fbcfe8)' },
  { label: 'Fuchsia',   gradient: 'from-purple-100 to-fuchsia-200',  accent: 'bg-purple-400',  preview: 'linear-gradient(135deg,#f3e8ff,#f5d0fe)' },
  { label: 'Violet',    gradient: 'from-violet-100 to-purple-200',   accent: 'bg-violet-400',  preview: 'linear-gradient(135deg,#ede9fe,#e9d5ff)' },
  { label: 'Blue',      gradient: 'from-sky-100 to-blue-200',        accent: 'bg-blue-400',    preview: 'linear-gradient(135deg,#e0f2fe,#bfdbfe)' },
  { label: 'Teal',      gradient: 'from-teal-100 to-cyan-200',       accent: 'bg-teal-400',    preview: 'linear-gradient(135deg,#ccfbf1,#a5f3fc)' },
  { label: 'Green',     gradient: 'from-green-100 to-emerald-200',   accent: 'bg-emerald-400', preview: 'linear-gradient(135deg,#dcfce7,#a7f3d0)' },
  { label: 'Lime',      gradient: 'from-lime-100 to-green-200',      accent: 'bg-lime-400',    preview: 'linear-gradient(135deg,#ecfccb,#bbf7d0)' },
  { label: 'Amber',     gradient: 'from-yellow-100 to-amber-200',    accent: 'bg-amber-400',   preview: 'linear-gradient(135deg,#fef9c3,#fde68a)' },
  { label: 'Orange',    gradient: 'from-orange-100 to-red-200',      accent: 'bg-orange-400',  preview: 'linear-gradient(135deg,#ffedd5,#fecaca)' },
  { label: 'Peach',     gradient: 'from-rose-50 to-orange-100',      accent: 'bg-rose-300',    preview: 'linear-gradient(135deg,#fff1f2,#ffedd5)' },
  { label: 'Slate',     gradient: 'from-slate-100 to-gray-200',      accent: 'bg-slate-400',   preview: 'linear-gradient(135deg,#f1f5f9,#e5e7eb)' },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products') // 'products' | 'testimonials' | 'occasions'
  const [products, setProducts] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [occasions, setOccasions] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      if (isAuthenticated) {
        setProducts(await getProducts())
        setTestimonials(await getTestimonials())
        setOccasions(await getOccasions())
      }
    }
    load()
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'giftadmin') {
      setIsAuthenticated(true)
    } else {
      alert('Contraseña incorrecta')
      setPassword('')
    }
  }

  // --- PRODUCTS LOGIC ---
  const handleProductChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const handleSaveProducts = async () => {
    setLoading(true)
    try {
      const dataToSave = products.map(p => {
        const { id, name, subtitle, price, badge, badge_color, media_url, media_type } = p
        return {
          ...(id > 0 ? { id } : {}),
          name, subtitle, price, badge, badge_color, media_url, media_type
        }
      })
      await saveProducts(dataToSave)
      setProducts(await getProducts())
      alert('Products saved successfully!')
    } catch (e) {
      alert('Error saving products: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        if (id > 0) await deleteProduct(id)
        setProducts(products.filter(p => p.id !== id))
      } catch (e) {
        alert('Error deleting product: ' + e.message)
      }
    }
  }

  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.min(...products.map(p => p.id)) - 1 : -1
    setProducts([{
      id: newId, name: 'New Product', subtitle: 'Description', price: '$0.00',
      badge: 'New', badge_color: 'bg-clay text-cream', media_url: '', media_type: 'image'
    }, ...products])
  }

  const handleUpload = async (e, productId) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    try {
      let fileToUpload = file
      const isVideo = file.type.startsWith('video/')
      if (file.type.startsWith('image/')) {
        fileToUpload = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1080, useWebWorker: true })
      }
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`

      const { error } = await supabase.storage.from('media').upload(filePath, fileToUpload, { upsert: false })
      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath)
      handleProductChange(productId, 'media_url', publicUrl)
      handleProductChange(productId, 'media_type', isVideo ? 'video' : 'image')
      alert('File uploaded successfully!')
    } catch (error) {
      alert('Error uploading file: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // --- TESTIMONIALS LOGIC ---
  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const handleSaveTestimonials = async () => {
    setLoading(true)
    try {
      const dataToSave = testimonials.map(t => {
        const { id, name, role, text, rating } = t
        return {
          ...(id > 0 ? { id } : {}),
          name, role, text, rating
        }
      })
      await saveTestimonials(dataToSave)
      setTestimonials(await getTestimonials())
      alert('Testimonials saved successfully!')
    } catch (e) {
      alert('Error saving testimonials: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        if (id > 0) await deleteTestimonial(id)
        setTestimonials(testimonials.filter(t => t.id !== id))
      } catch (e) {
        alert('Error deleting testimonial: ' + e.message)
      }
    }
  }

  const handleAddTestimonial = () => {
    const newId = testimonials.length > 0 ? Math.min(...testimonials.map(t => t.id)) - 1 : -1
    setTestimonials([{
      id: newId, name: 'New Customer', role: 'Location / Details', text: 'This was the best gift ever!', rating: 5
    }, ...testimonials])
  }

  // --- OCCASIONS LOGIC ---
  const handleOccasionChange = (id, field, value) => {
    setOccasions(occasions.map(o => o.id === id ? { ...o, [field]: value } : o))
  }

  const handleSaveOccasions = async () => {
    setLoading(true)
    try {
      const dataToSave = occasions.map(o => {
        const { id, name, emoji, count, gradient, accent, sort_order } = o
        return { ...(id > 0 ? { id } : {}), name, emoji, count, gradient, accent, sort_order }
      })
      await saveOccasions(dataToSave)
      setOccasions(await getOccasions())
      alert('Occasions saved successfully!')
    } catch (e) {
      alert('Error saving occasions: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOccasion = async (id) => {
    if (window.confirm('Delete this occasion card?')) {
      try {
        if (id > 0) await deleteOccasion(id)
        setOccasions(occasions.filter(o => o.id !== id))
      } catch (e) {
        alert('Error deleting: ' + e.message)
      }
    }
  }

  const handleAddOccasion = () => {
    const newId = occasions.length > 0 ? Math.min(...occasions.map(o => o.id)) - 1 : -1
    setOccasions([{
      id: newId, name: 'New Occasion', emoji: '🎁', count: '0 items',
      gradient: 'from-pink-100 to-rose-200', accent: 'bg-rose-400',
      sort_order: occasions.length + 1
    }, ...occasions])
  }


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full flex flex-col gap-6 text-center">
          <h2 className="font-serif text-2xl text-bark font-bold">Admin Login</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Introduce la clave" className="w-full p-3 border border-bark/20 rounded-xl text-center" autoFocus />
          <button type="submit" className="bg-bark text-cream py-3 rounded-xl font-bold hover:bg-bark-dark transition">Ingresar</button>
          <button type="button" onClick={() => window.location.hash = ''} className="text-sm text-bark/50 hover:text-bark">Volver a la tienda</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream/50 pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl text-bark font-bold">Store Admin Panel</h1>
            <p className="text-bark/60 mt-2">Manage your inventory and website content.</p>
          </div>
          <button 
            onClick={() => window.location.hash = ''} 
            className="px-6 py-2 rounded-full border border-bark/20 text-bark font-medium hover:bg-bark/5 transition"
            disabled={loading}
          >
            Back to Site
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-bark/10 mb-8">
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${activeTab === 'products' ? 'border-bark text-bark' : 'border-transparent text-bark/40 hover:text-bark/70'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${activeTab === 'testimonials' ? 'border-bark text-bark' : 'border-transparent text-bark/40 hover:text-bark/70'}`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => setActiveTab('occasions')}
            className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${activeTab === 'occasions' ? 'border-bark text-bark' : 'border-transparent text-bark/40 hover:text-bark/70'}`}
          >
            Occasions
          </button>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleAddProduct} disabled={loading} className="bg-clay text-cream px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-clay/90 transition shadow-sm disabled:opacity-50">
                <span>+</span> Add Product
              </button>
              <button onClick={handleSaveProducts} disabled={loading} className={`bg-bark text-cream px-6 py-3 rounded-xl font-medium shadow-md transition ${loading ? 'opacity-50' : 'hover:bg-bark-dark hover:shadow-lg'}`}>
                {loading ? 'Saving...' : 'Save Products'}
              </button>
            </div>

            <div className="grid gap-6">
              {products.map(p => (
                <div key={p.id} className="border border-bark/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 bg-cream/10 relative">
                  <button onClick={() => handleDeleteProduct(p.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition">Delete</button>

                  <div className="w-full md:w-48 shrink-0 flex flex-col gap-2">
                    <div className="w-full aspect-[4/5] bg-bark/5 rounded-xl flex items-center justify-center overflow-hidden border border-bark/10 relative group">
                      {p.media_url ? (
                        p.media_type === 'image' ? 
                          <img src={p.media_url} className="w-full h-full object-contain" /> :
                          <video src={p.media_url} className="w-full h-full object-contain" muted />
                      ) : (
                        <span className="text-xs text-bark/40">No media</span>
                      )}
                      
                      <label className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-sm font-bold">Upload</span>
                        <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleUpload(e, p.id)} disabled={loading} />
                      </label>
                    </div>
                    <select value={p.media_type || 'image'} onChange={e => handleProductChange(p.id, 'media_type', e.target.value)} className="w-full text-xs p-2 rounded-lg border border-bark/20 bg-white">
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Product Name</label>
                      <input type="text" value={p.name || ''} onChange={e => handleProductChange(p.id, 'name', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white font-serif text-lg" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Price</label>
                      <input type="text" value={p.price || ''} onChange={e => handleProductChange(p.id, 'price', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white font-bold" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Subtitle</label>
                      <input type="text" value={p.subtitle || ''} onChange={e => handleProductChange(p.id, 'subtitle', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Badge Text</label>
                      <input type="text" value={p.badge || ''} onChange={e => handleProductChange(p.id, 'badge', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Badge Color</label>
                      <input type="text" value={p.badge_color || ''} onChange={e => handleProductChange(p.id, 'badge_color', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm font-mono" />
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && <div className="text-center py-12 text-bark/40">No products found.</div>}
            </div>
          </div>
        )}

        {/* --- TESTIMONIALS TAB --- */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleAddTestimonial} disabled={loading} className="bg-clay text-cream px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-clay/90 transition shadow-sm disabled:opacity-50">
                <span>+</span> Add Testimonial
              </button>
              <button onClick={handleSaveTestimonials} disabled={loading} className={`bg-bark text-cream px-6 py-3 rounded-xl font-medium shadow-md transition ${loading ? 'opacity-50' : 'hover:bg-bark-dark hover:shadow-lg'}`}>
                {loading ? 'Saving...' : 'Save Testimonials'}
              </button>
            </div>

            <div className="grid gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="border border-bark/10 p-6 rounded-2xl flex flex-col gap-4 bg-cream/10 relative">
                  <button onClick={() => handleDeleteTestimonial(t.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition">Delete</button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-20">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Customer Name</label>
                      <input type="text" value={t.name || ''} onChange={e => handleTestimonialChange(t.id, 'name', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white font-bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Location / Role</label>
                      <input type="text" value={t.role || ''} onChange={e => handleTestimonialChange(t.id, 'role', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Stars (1-5)</label>
                      <input type="number" min="1" max="5" value={t.rating || 5} onChange={e => handleTestimonialChange(t.id, 'rating', parseInt(e.target.value))} className="p-3 rounded-xl border border-bark/20 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Review Text</label>
                      <textarea rows="3" value={t.text || ''} onChange={e => handleTestimonialChange(t.id, 'text', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm resize-none" />
                    </div>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-12 text-bark/40">
                  No testimonials right now. The section is hidden on the website until you add one.
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- OCCASIONS TAB --- */}
        {activeTab === 'occasions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleAddOccasion} disabled={loading} className="bg-clay text-cream px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-clay/90 transition shadow-sm disabled:opacity-50">
                <span>+</span> Add Occasion
              </button>
              <button onClick={handleSaveOccasions} disabled={loading} className={`bg-bark text-cream px-6 py-3 rounded-xl font-medium shadow-md transition ${loading ? 'opacity-50' : 'hover:bg-bark-dark hover:shadow-lg'}`}>
                {loading ? 'Saving...' : 'Save Occasions'}
              </button>
            </div>

            <div className="grid gap-6">
              {occasions.map(o => (
                <div key={o.id} className="border border-bark/10 p-6 rounded-2xl bg-cream/10 relative">
                  <button onClick={() => handleDeleteOccasion(o.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition">Delete</button>

                  {/* Preview */}
                  <div className={`bg-gradient-to-br ${o.gradient} h-24 rounded-xl flex items-center justify-center text-5xl mb-5 w-36`}>
                    {o.emoji}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-20">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Name</label>
                      <input type="text" value={o.name || ''} onChange={e => handleOccasionChange(o.id, 'name', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white font-serif text-lg" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Emoji</label>
                      <input type="text" value={o.emoji || ''} onChange={e => handleOccasionChange(o.id, 'emoji', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-2xl" placeholder="🎁" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Item Count Label</label>
                      <input type="text" value={o.count || ''} onChange={e => handleOccasionChange(o.id, 'count', e.target.value)} className="p-3 rounded-xl border border-bark/20 bg-white text-sm" placeholder="48 items" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Sort Order</label>
                      <input type="number" value={o.sort_order || 0} onChange={e => handleOccasionChange(o.id, 'sort_order', parseInt(e.target.value))} className="p-3 rounded-xl border border-bark/20 bg-white" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
                      <label className="text-xs font-semibold text-bark/60 uppercase tracking-wider">Card Color Theme</label>
                      <div className="flex flex-wrap gap-3">
                        {OCCASION_PALETTES.map(p => {
                          const isSelected = o.gradient === p.gradient
                          return (
                            <button
                              key={p.label}
                              type="button"
                              title={p.label}
                              onClick={() => {
                                handleOccasionChange(o.id, 'gradient', p.gradient)
                                handleOccasionChange(o.id, 'accent', p.accent)
                              }}
                              className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? 'border-bark shadow-md scale-105'
                                  : 'border-transparent hover:border-bark/30'
                              }`}
                            >
                              <div
                                style={{ background: p.preview }}
                                className="w-12 h-10 rounded-lg shadow-sm"
                              />
                              <span className="text-[10px] font-medium text-bark/60">{p.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {occasions.length === 0 && <div className="text-center py-12 text-bark/40">No occasions found.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
