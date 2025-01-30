// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const existingCUP = await prisma.currency.findUnique({ where: { code: 'CUP' } })
    if (!existingCUP) {
        await prisma.currency.create({
            data: {
                code: 'CUP',
                symbol: '$',
                exchangeRate: 1,
                isDefault: true,
            },
        })
        console.log('Moneda CUP creada.')
    } else {
        console.log('La moneda CUP ya existe.')
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })