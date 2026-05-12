import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Wait 5 seconds before triggering the animation
    const timer = setTimeout(() => {
      setShouldAnimate(true)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.a
      href="https://wa.me/923194309610"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={
          shouldAnimate 
            ? { rotate: [0, -15, 15, -15, 15, 0] } 
            : {}
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => {
          // Re-trigger every 15 seconds if desired, or just do it once.
          // Let's reset so it can happen again occasionally, or just once.
          if (shouldAnimate) {
            setTimeout(() => setShouldAnimate(true), 10000)
            setShouldAnimate(false) // toggle off to re-trigger later
          }
        }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.937 3.112 6.937 6.937 0 3.824-3.113 6.936-6.937 6.937z"/>
        </svg>
      </motion.div>
    </motion.a>
  )
}
