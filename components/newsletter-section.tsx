'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("¡Gracias por suscribirte! 🎉")
    setEmail("")
    setLoading(false)
  }

  return (
    <section className="relative py-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              ¡No te pierdas nada! ✨
            </h2>
            <p className="text-muted-foreground">
              Suscríbete a nuestro newsletter y recibe ofertas exclusivas,
              novedades y contenido premium directamente en tu correo.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-2"
          >
            <Input
              type="email"
              placeholder="✉️ tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
            <Button type="submit" disabled={loading} className="h-12">
              {loading ? "Enviando..." : "✨ ¡Suscribirme!"}
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            🔒 Tu privacidad es importante para nosotros. Nunca compartiremos tu
            información.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

