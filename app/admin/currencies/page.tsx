'use client'

import { useEffect, useState } from 'react'
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

interface Currency {
  id: string
  code: string
  symbol: string
  exchangeRate: number
  isDefault: boolean
}

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null)

  // Cargar monedas desde la API cuando el componente se monta
  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    const response = await fetch('/api/currencies')
    const data = await response.json()
    setCurrencies(data)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newCurrency = {
      code: formData.get('code') as string,
      symbol: formData.get('symbol') as string,
      exchangeRate: parseFloat(formData.get('exchangeRate') as string),
    }

    if (editingCurrency) {
      // Actualizar moneda existente
      const response = await fetch(`/api/currencies/${editingCurrency.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCurrency),
      })

      if (response.ok) {
        fetchCurrencies()
        setIsOpen(false)
        setEditingCurrency(null)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } else {
      // Crear nueva moneda
      const response = await fetch('/api/currencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCurrency),
      })

      if (response.ok) {
        fetchCurrencies()
        setIsOpen(false)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta moneda?')) return

    const response = await fetch(`/api/currencies/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchCurrencies()
    } else {
      const error = await response.json()
      alert(error.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">💰 Gestión de Monedas</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>✨ Nueva Moneda</Button>
          </DialogTrigger>
          <DialogContent aria-describedby="currency-form-description">
            <DialogHeader>
              <DialogTitle>
                {editingCurrency ? '✏️ Editar Moneda' : '✨ Nueva Moneda'}
              </DialogTitle>
              <DialogDescription id="currency-form-description">
                Configura los detalles de la moneda y su tipo de cambio.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  name="code"
                  defaultValue={editingCurrency?.code}
                  placeholder="USD"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">Símbolo</Label>
                <Input
                  id="symbol"
                  name="symbol"
                  defaultValue={editingCurrency?.symbol}
                  placeholder="$"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exchangeRate">Tipo de Cambio (respecto a CUP)</Label>
                <Input
                  id="exchangeRate"
                  name="exchangeRate"
                  type="number"
                  step="0.01"
                  defaultValue={editingCurrency?.exchangeRate}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingCurrency ? '💾 Guardar Cambios' : '✨ Crear Moneda'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currencies.map((currency) => (
          <Card key={currency.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{currency.symbol} {currency.code}</span>
                {currency.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Por defecto
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Tipo de cambio: {currency.exchangeRate} CUP
              </p>
              <div className="flex gap-2">
                {!currency.isDefault && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setEditingCurrency(currency)
                        setIsOpen(true)
                      }}
                    >
                      ✏️ Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(currency.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

