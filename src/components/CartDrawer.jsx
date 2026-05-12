import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  // Replace with actual business WhatsApp number (with country code, no +)
  const WHATSAPP_NUMBER = '923194309610'

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    let message = "Hi giftdrift.k! 🌸 I'd like to place an order for:\n\n"
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ${item.price}\n`
    })
    
    message += `\n*Total Estimate: $${cartTotal.toFixed(2)}*\n\n`
    message += "Please let me know how to proceed with payment and delivery details. Thank you! 🎁"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-bark/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-cream shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-blush/30 flex justify-between items-center bg-white">
          <h2 className="font-serif text-2xl text-bark font-bold flex items-center gap-2">
            Your Cart <span className="text-sm bg-blush text-bark px-2 py-0.5 rounded-full">{cartItems.length}</span>
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bark/5 text-bark/60 hover:text-bark transition"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-bark/40 gap-4">
              <span className="text-6xl">🛍️</span>
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 border border-bark/20 rounded-full text-bark hover:bg-bark/5 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-blush/40 shadow-sm">
                <div className="w-20 h-24 bg-cream rounded-xl overflow-hidden shrink-0">
                  {item.media_type === 'image' ? (
                    <img loading="lazy" src={item.media_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.media_url} className="w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif text-bark font-bold leading-tight">{item.name}</h3>
                    <p className="text-bark/50 text-xs mt-1">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-cream px-3 py-1 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-bark/60 hover:text-bark font-bold">−</button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-bark/60 hover:text-bark font-bold">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-blush/30">
            <div className="flex justify-between items-center mb-4 text-bark">
              <span className="font-medium text-bark/60">Subtotal</span>
              <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-bark/40 mb-4 text-center">Shipping & taxes calculated on WhatsApp</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition shadow-lg shadow-green-500/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}
