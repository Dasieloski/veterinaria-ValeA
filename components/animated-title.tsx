'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedTitle() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const letters = "99-Store".split("")

  if (!isClient) return null

  return (
    <div 
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        animate={isHovered ? {
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 0.5 }}
        className="inline-block text-2xl"
      >
        9️⃣9️⃣
      </motion.span>
      <div className="flex flex-col">
        <div className="flex">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="font-black text-2xl md:text-3xl font-display"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.1,
                color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][index % 4],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <span className="text-sm font-medium bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Tu tienda favorita en La Habana
        </span>
      </div>
    </div>
  )
}

