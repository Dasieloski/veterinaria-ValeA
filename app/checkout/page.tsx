"use client"
import type React from "react"
import {  useMemo } from "react"
//import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
 // const router = useRouter()
  const { cart, getCartTotal, clearCart, removeFromCart } = useCart()

  const total = useMemo(() => {
    const calculatedTotal = getCartTotal()
    console.log("Total calculado en CheckoutPage:", calculatedTotal)
    return calculatedTotal
  }, [getCartTotal])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    let message = "🛍️ *Nuevo Pedido en Dasieloski Store*\n\n"
    message += "👤 *Datos del Cliente:*\n"
    message += `- Nombre: ${formData.get("name")}\n`
    message += `- Teléfono: ${formData.get("phone")}\n\n`
    message += "📍 *Dirección de Envío:*\n"
    message += `${formData.get("address")}\n\n`
    message += "🛒 *Productos:*\n"

    cart.forEach((item) => {
      message += `- ${item.emoji} ${item.name}: $${item.price} x ${item.quantity || 1}\n`
    })

    message += `\n💰 *Total:* $${total.toFixed(2)}`
    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = "+5354710329"
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
    clearCart()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Finalizar Compra
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de datos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Datos de Envío</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkoutForm" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" name="name" required placeholder="Tu nombre completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" required placeholder="Tu número de teléfono" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      placeholder="Dirección completa de envío"
                      className="min-h-[100px]"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resumen del carrito */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:sticky md:top-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price} x {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="hover:bg-destructive/20"
                        >
                          ❌
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Button type="submit" form="checkoutForm" className="w-full text-lg h-12">
                      💬 Continuar en WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

