import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const { hash } = bcrypt

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@dasieloski.com'
  const password = 'admin123'
  const role = 'admin'

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('El usuario administrador ya existe.')
    return
  }

  // Hash del password
  const hashedPassword = await hash(password, 10)

  // Crear el usuario administrador
  const adminUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  })

  console.log('Usuario administrador creado:', adminUser)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
