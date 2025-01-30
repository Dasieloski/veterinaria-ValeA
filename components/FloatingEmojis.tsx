'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FloatingEmojis = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const emojis = ["🚀", "⭐", "💫", "✨", "🌟", "💝", "🎉", "🎈", "🎊", "🎁", "9️⃣"]

    useEffect(() => {
        // Función para actualizar el tamaño de la ventana
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // Establecer el tamaño inicial
        handleResize()

        // Escuchar cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize)

        // Limpiar el listener al desmontar el componente
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {windowSize.width > 0 && windowSize.height > 0 && emojis.map((emoji, index) => (
                <motion.div
                    key={index}
                    className="absolute text-3xl"
                    initial={{
                        x: Math.random() * windowSize.width,
                        y: Math.random() * windowSize.height,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, -500],
                        opacity: [0, 1, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 20
                    }}
                >
                    {emoji}
                </motion.div>
            ))}
        </div>
    )
}

export default FloatingEmojis

/* // Floating emojis animation
const FloatingEmojis = () => {
  const emojis = ["🚀", "⭐", "💫", "✨", "🌟", "💝", "🎉", "🎈", "🎊", "🎁"]
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{
            y: [null, -500],
            opacity: [0, 1, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 20
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
} */