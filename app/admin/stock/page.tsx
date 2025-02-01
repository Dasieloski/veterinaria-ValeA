"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  id: string
  name: string
  emoji: string
  gradient: string
  description: string
}

interface Product {
  id: string
  name: string
  image: string
  stock: number
  category?: Category
}

export default function StockManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/stock', { method: 'GET' })
        if (!res.ok) {
          throw new Error('Error al obtener los productos')
        }
        const data: Product[] = await res.json()
        console.log('Productos recibidos:', data) // Para depuración
        setProducts(data)
        setFilteredProducts(data)

        // Extraer categorías únicas
        const uniqueCategories = Array.from(new Set(data.map(product => product.category?.name))).map(name => {
          return data.find(product => product.category?.name === name)?.category as Category
        })
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error al cargar los productos:', error)
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]
    if (filterCategory === "low_stock") {
      result = result.filter((product) => product.stock <= 5)
    } else if (filterCategory !== "all") {
      result = result.filter((product) => product.category?.name === filterCategory)
    }
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "stock") return a.stock - b.stock
      return 0
    })
    setFilteredProducts(result)
  }, [filterCategory, sortBy, products])

  const updateStock = async (id: string, newStock: number) => {
    // Validar que newStock es un número válido
    if (isNaN(newStock) || newStock < 0) {
      console.error('Por favor, ingresa un número válido para el stock.')
      return
    }

    try {
      const res = await fetch('/api/stock', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock: newStock }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Error al actualizar el stock:', errorData.error)
        return
      }

      const updatedProduct: Product = await res.json()
      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)))
      console.log(`Stock de ${updatedProduct.name} actualizado a ${updatedProduct.stock}`)
    } catch (error) {
      console.error('Error al conectar con la API:', error)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">📦 Gestión de Stock</h1>
      <div className="flex justify-between mb-4">
        <Select onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="🔍 Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
            ))}
            <SelectItem value="low_stock">Stock bajo</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="🔀 Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre</SelectItem>
            <SelectItem value="stock">Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={product.stock <= 5 ? "animate-pulse bg-red-100 dark:bg-red-900" : ""}
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
                <p>
                  <span className="font-bold">📁 Categoría:</span> {product.category?.name || 'Sin categoría'}
                </p>
                <p>
                  <span className="font-bold">🔢 Stock actual:</span> {product.stock}
                </p>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (isNaN(value) || value < 0) {
                        console.error('Por favor, ingresa un número válido para el stock.')
                        return
                      }
                      updateStock(product.id, value)
                    }}
                    className="w-20"
                    min={0}
                  />
                  <Button onClick={() => updateStock(product.id, product.stock)}>🔄 Actualizar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

