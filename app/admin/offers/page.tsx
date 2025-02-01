/* eslint-disable */
'use client'

import { useState, useEffect } from 'react'
//import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { fetchOffers, fetchProducts, createOffer, updateOffer, deleteOffer } from '@/lib/api'

interface Product {
  id: string
  name: string
  price: number
}

interface Offer {
  id: string
  productId: string
  product: Product
  discount: number
  startDate: string
  endDate: string
  isActive: boolean
  title: string
  description: string
  emoji: string
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await fetchOffers()
        setOffers(data)
      } catch (error) {
        console.error(error)
      }
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadOffers()
    loadProducts()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const offerData = {
      productId: data.productId as string,
      discount: parseFloat(data.discount as string),
      startDate: data.startDate as string,
      endDate: data.endDate as string,
      isActive: data.isActive === 'on',
      title: data.title as string,
      description: data.description as string,
      emoji: data.emoji as string,
    }

    try {
      if (editingOffer) {
        const updated = await updateOffer(editingOffer.id, offerData)
        setOffers(offers.map(offer => offer.id === updated.id ? updated : offer))
      } else {
        const newOffer = await createOffer(offerData)
        setOffers([...offers, newOffer])
      }

      setIsOpen(false)
      setEditingOffer(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta oferta?')) return

    try {
      await deleteOffer(id)
      setOffers(offers.filter(offer => offer.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🔥 Gestión de Ofertas</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>✨ Nueva Oferta</Button>
          </DialogTrigger>
          <DialogContent aria-describedby="offer-form-description">
            <DialogHeader>
              <DialogTitle>
                {editingOffer ? '✏️ Editar Oferta' : '✨ Nueva Oferta'}
              </DialogTitle>
              <DialogDescription id="offer-form-description">
                Configura los detalles de la oferta especial.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productId">Producto</Label>
                <Select name="productId" defaultValue={editingOffer?.productId || ''} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No hay productos disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={editingOffer?.title || ''}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  defaultValue={editingOffer?.description || ''}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  name="emoji"
                  type="text"
                  defaultValue={editingOffer?.emoji || ''}
                  required
                  placeholder="🌟, 🔥, 🎉, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Descuento (%)</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={editingOffer?.discount}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="datetime-local"
                  defaultValue={editingOffer ? new Date(editingOffer.startDate).toISOString().slice(0, 16) : ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de fin</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  defaultValue={editingOffer ? new Date(editingOffer.endDate).toISOString().slice(0, 16) : ''}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={products.length === 0}>
                  {editingOffer ? '💾 Guardar Cambios' : '✨ Crear Oferta'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                  <p>Inicio: {new Date(offer.startDate).toLocaleDateString()}</p>
                  <p>Fin: {new Date(offer.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditingOffer(offer)
                      setIsOpen(true)
                    }}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(offer.id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

