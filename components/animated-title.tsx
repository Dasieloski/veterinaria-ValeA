"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedTitle() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const mainText = "ValeA"
  const letters = mainText.split("")

  // Iconos de animales que rotarán
  const animalIcons = ["🐴", "🐱", "🐰", "🦜"]
  const [currentIcon, setCurrentIcon] = useState(0)

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % animalIcons.length)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  if (!isClient) return null

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/10 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative"
        animate={
          isHovered
            ? {
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }
            : {}
        }
        transition={{ duration: 0.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      >
        <span className="text-3xl">{animalIcons[currentIcon]}</span>
        {isHovered && (
          <motion.div
            className="absolute -top-1 -right-1 text-xs bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            +
          </motion.div>
        )}
      </motion.div>

      <div className="flex flex-col">
        <div className="flex">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="font-black text-3xl md:text-4xl font-display tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, 5, -5, 0],
                color: ["#7C3AED", "#EC4899", "#8B5CF6", "#D946EF"][index % 4], // Tonos morados y rosas
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-1"
        >
          <span className="text-sm font-medium bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Farmacia Veterinaria
          </span>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Atención 24/7
            </span>
            <span>•</span>
            <span>Emergencias</span>
            <span>•</span>
            <span>Productos Premium</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

