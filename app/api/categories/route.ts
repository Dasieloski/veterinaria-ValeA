/* eslint-disable */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Intentando obtener las categorías...')
    const categories = await prisma.category.findMany()
    console.log('Categorías obtenidas:', categories)
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error('Error en GET /api/categories:', error)
    return NextResponse.json({ error: 'Error al obtener las categorías' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, emoji, description, gradient } = await request.json()

    if (!name || !emoji || !description) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Asegurar que el ID sea igual al nombre
    const id = name.toLowerCase().replace(/\s+/g, '-')

    // Verificar si la categoría ya existe
    const existingCategory = await prisma.category.findUnique({ where: { id } })
    if (existingCategory) {
      return NextResponse.json({ error: 'La categoría ya existe' }, { status: 409 })
    }

    const newCategory = await prisma.category.create({
      data: {
        id,
        name,
        emoji,
        description,
        gradient: gradient || '',
      },
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (_error) {
    console.error('Error en POST /api/categories:', _error)
    return NextResponse.json({ error: 'Error al crear la categoría' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, emoji, description, gradient } = await request.json()

    if (!id || !name || !emoji || !description) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Si el nombre cambia, actualizar el ID
    const newId = name.toLowerCase().replace(/\s+/g, '-')

    // Actualizar la categoría
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        id: newId,
        name,
        emoji,
        description,
        gradient: gradient || '',
      },
    })

    return NextResponse.json(updatedCategory, { status: 200 })
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Error al actualizar la categoría' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Categoría eliminada exitosamente' }, { status: 200 })
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Error al eliminar la categoría' }, { status: 500 })
  }
}