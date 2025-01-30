'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const floatingEmojis = ["🚫", "❌", "🛑", "🔍", "🤷‍♂️", "🤔", "😕", "😢", "🕵️‍♀️", "📄"]

export default function NotFound() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating emojis */}
      {windowDimensions.width > 0 && floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl pointer-events-none"
          initial={{
            x: Math.random() * windowDimensions.width,
            y: Math.random() * windowDimensions.height,
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

      <div className="max-w-md text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold">¡Ups! Página no encontrada 😅</h2>
          <p className="text-muted-foreground">
            ¡Vaya! Parece que te has perdido en el espacio.
            Esta página ha desaparecido como por arte de magia ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button
              size="lg"
              className="group"
            >
              <span className="mr-2 group-hover:rotate-12 transition-transform">
                🏠
              </span>
              Volver al inicio
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Volver atrás
          </Button>
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [0.8, 1, 0.8],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [0.8, 1, 0.8],
            rotate: [360, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-12 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}

