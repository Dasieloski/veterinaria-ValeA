// app/api/currencies/[id]/route.ts
/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params, searchParams: _searchParams }: { params: { id: string }, searchParams: URLSearchParams }
) {
  const { id } = params
  const data = await request.json()
  const { code, symbol, exchangeRate } = data

  // No permitir actualizar la moneda predeterminada
  const currency = await prisma.currency.findUnique({ where: { id } })
  if (currency?.isDefault) {
    return NextResponse.json(
      { error: 'No se puede actualizar la moneda predeterminada.' },
      { status: 400 }
    )
  }

  const updatedCurrency = await prisma.currency.update({
    where: { id },
    data: {
      code,
      symbol,
      exchangeRate,
    },
  })

  return NextResponse.json(updatedCurrency)
}

export async function DELETE(
  request: NextRequest,
  { params, searchParams: _searchParams }: { params: { id: string }, searchParams: URLSearchParams }
) {
  const { id } = params

  const currency = await prisma.currency.findUnique({ where: { id } })
  if (!currency) {
    return NextResponse.json({ error: 'Moneda no encontrada.' }, { status: 404 })
  }

  if (currency.isDefault) {
    return NextResponse.json({ error: 'No se puede eliminar la moneda predeterminada.' }, { status: 400 })
  }

  await prisma.currency.delete({ where: { id } })
  return NextResponse.json({ message: 'Moneda eliminada correctamente.' })
}