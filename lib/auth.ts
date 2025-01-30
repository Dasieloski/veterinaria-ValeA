/* eslint-disable */
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { db } from './db'
import bcrypt from 'bcryptjs'

const { compare } = bcrypt

const secretKey = process.env.JWT_SECRET_KEY!
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Intentando iniciar sesión para:', email)

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  })

  if (!user) {
    console.log('Usuario no encontrado:', email)
    throw new Error('Usuario no encontrado')
  }

  const isValid = await compare(password, user.password)
  console.log('¿Contraseña válida?', isValid)

  if (!isValid) {
    console.log('Contraseña incorrecta para:', email)
    throw new Error('Contraseña incorrecta')
  }

  // Crear sesión
  const session = await encrypt({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  // Guardar token de refresco
  await db.token.create({
    data: {
      token: session,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    },
  })

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return { success: true }
}

export async function logout() {
  const session = cookies().get('session')?.value
  if (!session) return

  // Eliminar tokens de refresco asociados
  await db.token.deleteMany({
    where: { token: session },
  })

  cookies().delete('session')
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Verificar token en la base de datos
  const token = await db.token.findUnique({
    where: { token: session },
    include: { user: true },
  })

  if (!token) return

  // Verificar si el token ha expirado
  if (token.expiresAt < new Date()) {
    await db.token.delete({ where: { id: token.id } })
    return
  }

  // Crear una nueva sesión
  const newSession = await encrypt({
    id: token.user.id,
    email: token.user.email,
    role: token.user.role,
  })

  // Actualizar el token en la base de datos
  await db.token.update({
    where: { id: token.id },
    data: {
      token: newSession,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  const response = NextResponse.next()
  response.cookies.set('session', newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return response
}

