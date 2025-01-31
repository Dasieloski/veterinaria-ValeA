import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Versión corregida del PUT
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } } // Corregido aquí
) {
  try {
    const { id } = params; // Acceso directo a params
    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const data = await request.json();
    const { code, symbol, exchangeRate } = data;

    // Verificar moneda predeterminada
    const currency = await prisma.currency.findUnique({ where: { id } });
    if (currency?.isDefault) {
      return NextResponse.json(
        { error: 'No se puede actualizar la moneda predeterminada' },
        { status: 400 }
      );
    }

    // Actualizar moneda
    const updatedCurrency = await prisma.currency.update({
      where: { id },
      data: { code, symbol, exchangeRate },
    });

    return NextResponse.json(updatedCurrency);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Versión corregida del DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Corregido aquí
) {
  try {
    const { id } = params; // Acceso directo a params
    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const currency = await prisma.currency.findUnique({ where: { id } });
    if (!currency) {
      return NextResponse.json({ error: 'Moneda no encontrada' }, { status: 404 });
    }

    if (currency.isDefault) {
      return NextResponse.json(
        { error: 'No se puede eliminar la moneda predeterminada' },
        { status: 400 }
      );
    }

    await prisma.currency.delete({ where: { id } });
    return NextResponse.json({ message: 'Moneda eliminada correctamente' });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}