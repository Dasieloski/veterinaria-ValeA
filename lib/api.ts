import { Offer } from "@prisma/client"

export interface OfferInput {
    productId: string
    discount: number
    startDate: string
    endDate: string
    isActive?: boolean
    title: string
    description: string
    emoji: string
}

export async function fetchOffers(): Promise<Offer[]> {
    const response = await fetch('/api/offers')
    if (!response.ok) {
        throw new Error('Error al obtener las ofertas.')
    }
    const data = await response.json()
    return data as Offer[]
}

export async function fetchProducts() {
    const response = await fetch('/api/products')
    if (!response.ok) {
        throw new Error('Error al obtener los productos.')
    }
    return response.json()
}

export async function createOffer(offer: OfferInput): Promise<Offer> {
    const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
    })
    if (!response.ok) {
        throw new Error('Error al crear la oferta.')
    }
    return response.json()
}

export async function updateOffer(id: string, offer: OfferInput): Promise<Offer> {
    const response = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
    })
    if (!response.ok) {
        throw new Error('Error al actualizar la oferta.')
    }
    return response.json()
}

export async function deleteOffer(id: string) {
    const response = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Error al eliminar la oferta.')
    }
    return response.json()
}