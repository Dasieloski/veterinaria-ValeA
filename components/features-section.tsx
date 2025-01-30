'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Clock, Gift } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: "Envío Express",
    description: "Entrega en 24/48 horas en toda La Habana",
    emoji: "🚚",
  },
  {
    icon: Shield,
    title: "Garantía Premium",
    description: "Todos nuestros productos con garantía de calidad",
    emoji: "🛡️",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description: "Estamos aquí para ayudarte en todo momento",
    emoji: "⏰",
  },
  {
    icon: Gift,
    title: "Regalos Especiales",
    description: "Sorpresas exclusivas en compras superiores",
    emoji: "🎁",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-20">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] opacity-5" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            ¿Por qué elegirnos? ✨
          </h2>
          <p className="mt-2 text-muted-foreground">
            Descubre los beneficios exclusivos de comprar en Dasieloski Store
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <span className="text-xl">{feature.emoji}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

