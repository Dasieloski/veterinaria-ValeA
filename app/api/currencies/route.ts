/* eslint-disable */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const currencies = await prisma.currency.findMany()
  return NextResponse.json(currencies)
}

export async function POST(request: Request) {
  const data = await request.json()
  const { code, symbol, exchangeRate } = data

  // Verificar que la moneda "CUP" no se pueda crear de nuevo
  if (code === 'USD') {
    return NextResponse.json({ error: 'La moneda USD ya existe.' }, { status: 400 })
  }

  const newCurrency = await prisma.currency.create({
    data: {
      code,
      symbol,
      exchangeRate,
      isDefault: false,
    },
  })

  return NextResponse.json(newCurrency)
}

