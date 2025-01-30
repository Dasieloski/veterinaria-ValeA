// app/api/offers/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const offer = await db.offer.findUnique({
            where: { id },
            include: {
                product: {
                   /*  include: {
                        images: true,
                    }, */
                },
            },
        })

        if (!offer) {
            return NextResponse.json({ error: 'Oferta no encontrada.' }, { status: 404 })
        }

        return NextResponse.json(offer)
    } catch (_error) {
        console.error('Error al obtener la oferta:', _error)
        return NextResponse.json({ error: 'Error al obtener la oferta.' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const data = await request.json()
        const { productId, discount, startDate, endDate, isActive, title, description, emoji } = data

        const updatedOffer = await db.offer.update({
            where: { id },
            data: {
                productId,
                discount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                isActive,
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

        return NextResponse.json(updatedOffer)
    } catch (_error) {
        console.error('Error al actualizar la oferta:', _error)
        return NextResponse.json({ error: 'Error al actualizar la oferta.' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        await db.offer.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'Oferta eliminada exitosamente.' }, { status: 200 })
    } catch (_error) {
        console.error('Error al eliminar la oferta:', _error)
        return NextResponse.json({ error: 'Error al eliminar la oferta.' }, { status: 500 })
    }
}