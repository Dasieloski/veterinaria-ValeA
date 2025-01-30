'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function AdminNotFound() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold">¡Recurso no encontrado! 🔍</h2>
          <p className="text-muted-foreground">
            Lo sentimos, pero el recurso que intentas acceder no existe o ha sido eliminado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/admin">
            <Button size="lg">
              📊 Volver al Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            ← Volver atrás
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-8 flex justify-center gap-4 text-4xl opacity-50"
        >
          <span>⚡</span>
          <span>📊</span>
          <span>🔍</span>
        </motion.div>
      </div>
    </div>
  )
}

