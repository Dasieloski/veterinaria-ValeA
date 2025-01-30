"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Stats {
  totalCategories: number
  totalProducts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (!response.ok) {
          throw new Error('Error al obtener las estadísticas.')
        }
        const data: Stats = await response.json()
        setStats(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || 'Ocurrió un error inesperado.')
        } else {
          setError('Ocurrió un error inesperado.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">👋 ¡Bienvenido al Panel de Administración! 🎉</h1>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorías Totales 🗂️
              </CardTitle>
              <span className="text-2xl">📁</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Cargando...</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productos Totales 🛍️
              </CardTitle>
              <span className="text-2xl">📦</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Cargando...</div>
            </CardContent>
          </Card>
        </div>
      ) : error ? (
        <div className="text-red-500">
          {error}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorías Totales 🗂️
              </CardTitle>
              <span className="text-2xl">📁</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCategories} 🏷️</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productos Totales 🛍️
              </CardTitle>
              <span className="text-2xl">📦</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalProducts} 🎁</div>
            </CardContent>
          </Card>
          {/* Opcional: Agregar más tarjetas dinámicas según sea necesario */}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* <Card>
          <CardHeader>
            <CardTitle>Línea de Tiempo de Ofertas 🏷️⏳</CardTitle>
          </CardHeader>
          <CardContent>
            <OfferTimeline />
          </CardContent>
        </Card> */}
      {/*   <Card>
          <CardHeader>
            <CardTitle>Productos por Categoría 📊🛍️</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsByCategoryChart />
          </CardContent>
        </Card> */}
      </div>

    {/*   <Card>
        <CardHeader>
          <CardTitle>Tasas de Cambio de Monedas 💱💹</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrencyExchangeRates />
        </CardContent>
      </Card> */}
    </div>
  )
}

