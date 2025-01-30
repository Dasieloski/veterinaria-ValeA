'use client'

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "María González",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Cliente Verificada ✓",
    content:
      "¡Increíble experiencia de compra! Los productos son de excelente calidad y el servicio al cliente es excepcional. ¡Totalmente recomendado! 🌟",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Cliente Verificado ✓",
    content:
      "La mejor tienda online que he encontrado en La Habana. Envío rápido y productos genuinos. ¡Volveré a comprar! 💯",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Cliente Verificada ✓",
    content:
      "Excelente atención y productos de primera calidad. Los precios son muy competitivos. ¡Super recomendado! 🏆",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={containerRef} className="relative py-20">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.5]),
          }}
          className="absolute inset-0 bg-[url('/testimonials-pattern.svg')] opacity-5"
        />
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
            Lo que dicen nuestros clientes ❤️
          </h2>
          <p className="mt-2 text-muted-foreground">
            Experiencias reales de clientes satisfechos
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-primary">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

