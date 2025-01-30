import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'

const prisma = new PrismaClient()

async function deleteExpiredOffers() {
    try {
        const now = new Date()
        const expiredOffers = await prisma.offer.findMany({
            where: {
                endDate: {
                    lt: now,
                },
            },
        })

        if (expiredOffers.length > 0) {
            const ids = expiredOffers.map(offer => offer.id)
            await prisma.offer.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            })
            console.log(`Se eliminaron ${expiredOffers.length} ofertas expiradas.`)
        } else {
            console.log('No hay ofertas expiradas para eliminar.')
        }
    } catch (error) {
        console.error('Error al eliminar ofertas expiradas:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Programar la tarea para que se ejecute cada hora
cron.schedule('0 * * * *', () => {
    console.log('Ejecutando tarea programada: Eliminar ofertas expiradas...')
    deleteExpiredOffers()
})

// Ejecutar inmediatamente al iniciar el script
deleteExpiredOffers()