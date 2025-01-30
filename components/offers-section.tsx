'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Offer {
  id: string
  product: {
    id: string
    name: string
    price: number
    images: { url: string; alt: string }[]
    description: string
  }
  discount: number
  endDate: string
  isActive: boolean
}

interface OffersSectionProps {
  offers: Offer[]
  onAddToCart: (productId: string) => void
}

/* interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
  image: string;
} */

export function OffersSection({ offers, onAddToCart }: OffersSectionProps) {
  return (
    <section className="py-8 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">🔥 Ofertas Especiales</h2>
          <p className="text-muted-foreground">
            ¡No te pierdas estas increíbles ofertas por tiempo limitado!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{offer.product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={offer.product.images[0].url}
                        alt={offer.product.images[0].alt}
                        width={400}
                        height={400}
                        className="w-full object-cover aspect-square"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full">
                        -{offer.discount}%
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {offer.discount}% de descuento
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Precio original: ${offer.product.price}
                      </p>
                      <p className="text-sm text-primary">
                        Precio con descuento: ${(offer.product.price * (1 - offer.discount / 100)).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>Fin: {new Date(offer.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onAddToCart({
                          id: offer.product.id,
                          name: offer.product.name,
                          price: offer.product.price,
                          quantity: 1, // Puedes ajustar la cantidad según tus necesidades
                          emoji: offer.product.emoji,
                          image: offer.product.image || "/placeholder.svg"
                        })}
                      >
                        🛒 Agregar al carrito
                      </Button>
                    </div>
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

