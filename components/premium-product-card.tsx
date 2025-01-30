'use client'

import React, { useContext } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { CartContext, CartContextType } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  price: number
  images: { url: string; alt: string }[]
  category: string
  description: string
  rating?: number
  reviews?: number
  discount?: number
  isNew?: boolean
  stock: number
  emoji: string
}

interface PremiumProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export function PremiumProductCard({
  product,
  onAddToWishlist,
}: PremiumProductCardProps) {
  const context = useContext<CartContextType | undefined>(CartContext)

  if (!context) {
    throw new Error('useContext must be used within a CartProvider')
  }

  const { addToCart } = context

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-2 transition-colors hover:border-primary/50">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0].url || "/placeholder.svg"}
              alt={product.images[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Badges */}
            <div className="absolute left-2 top-2 flex flex-col gap-2">
              {product.isNew && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  ✨ Nuevo
                </Badge>
              )}
              {product.discount && (
                <Badge variant="destructive">
                  🔥 -{product.discount}%
                </Badge>
              )}
              {product.stock < 5 && product.stock > 0 && (
                <Badge variant="secondary">
                  ⚡ Últimas unidades
                </Badge>
              )}
            </div>

            {/* Quick actions */}
            <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => onAddToWishlist(product)}
              >
                <Heart className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Product info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="space-y-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-4">
          <div className="flex w-full items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < (product.rating || 0)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                {product.reviews && (
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {product.discount ? (
                  <>
                    <span className="font-bold">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">${product.price}</span>
                )}
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                className="rounded-full"
                onClick={() => addToCart({
                  ...product,
                  quantity: 1,
                  image: product.images[0]?.url || "/placeholder.svg"
                })}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

