import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const offers = await db.offer.findMany({
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        description: true,
                        emoji: true,
                    },
                },
            },
          /*   where: {
                isActive: true,
            }, */
            orderBy: {
                createdAt: 'desc',
            },
        })
        return NextResponse.json(offers, { status: 200 })
    } catch (error) {
        console.error('Error al obtener las ofertas:', error)
        return NextResponse.json(
            { error: 'Error al obtener las ofertas.', details: (error as Error).message },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const { productId, discount, startDate, endDate, isActive, title, description, emoji } = data

        // Validar campos requeridos
        if (!productId || discount === undefined || !startDate || !endDate || !title || !description || !emoji) {
            return NextResponse.json({ error: 'Datos incompletos.' }, { status: 400 })
        }

        // Verificar si el producto existe y tiene una imagen
        const product = await db.product.findUnique({
            where: { id: productId },
            select: { image: true },
        })
        if (!product || !product.image) {
            return NextResponse.json({ error: 'Producto no encontrado o sin imagen.' }, { status: 404 })
        }

        // Crear la oferta
        const newOffer = await db.offer.create({
            data: {
                productId,
                discount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                isActive: isActive ?? true,
                title,
                description,
                emoji,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        description: true,
                        emoji: true,
                    },
                },
            },
        })

        return NextResponse.json(newOffer, { status: 201 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        console.error('Error desconocido al crear la oferta:', error)
        return NextResponse.json({ error: 'Error al crear la oferta' }, { status: 500 })
    }
}