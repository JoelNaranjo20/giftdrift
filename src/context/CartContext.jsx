import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('giftdrift_cart')
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (e) {
        // ignore
      }
    }
  }, [])

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('giftdrift_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true) // auto open cart when adding
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + amount)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const cartTotal = cartItems.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return total + (numericPrice * item.quantity)
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
