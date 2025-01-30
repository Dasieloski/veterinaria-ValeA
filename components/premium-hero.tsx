'use client'

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export function PremiumHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10"
      />
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      </motion.div>
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-3xl"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              ✨ Bienvenido a la Experiencia
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Dasieloski
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Donde la calidad se encuentra con el estilo 🌟
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-75 blur transition duration-1000 group-hover:opacity-100" />
              <button className="relative rounded-lg bg-background px-6 py-3 font-semibold text-foreground">
                🛍️ Explorar Productos
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-secondary to-primary opacity-75 blur transition duration-1000 group-hover:opacity-100" />
              <button className="relative rounded-lg bg-background px-6 py-3 font-semibold text-foreground">
                🎁 Ver Ofertas
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </div>
  )
}

