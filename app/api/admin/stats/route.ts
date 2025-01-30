import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Contar el total de categorías
    const totalCategories = await prisma.category.count()

    // Contar el total de productos
    const totalProducts = await prisma.product.count()

    return NextResponse.json({
      totalCategories,
      totalProducts,
    }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener las estadísticas:', error.message)
      return NextResponse.json(
        { error: 'Error al obtener las estadísticas.', details: error.message },
        { status: 500 }
      )
    }
    console.error('Error al obtener las estadísticas:', error)
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas.', details: 'Error desconocido' },
      { status: 500 }
    )
  }
}