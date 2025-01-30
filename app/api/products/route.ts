import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// Definir la interfaz para los archivos
interface FileType {
    filename: string
    contentType: string
    path: string
    url: string
}

const prisma = new PrismaClient()

export const config = {
    api: {
        bodyParser: false,
    },
}

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

// Asegurarse de que el directorio de subida exista
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

// Función para parsear multipart/form-data
async function parseMultipartForm(request: Request) {
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
        throw new Error('Content-Type no es multipart/form-data')
    }

    const boundaryMatch = contentType.match(/boundary=(.+)$/)
    if (!boundaryMatch) {
        throw new Error('No se encontró el boundary en el Content-Type')
    }

    const boundary = boundaryMatch[1]
    const buffer = await request.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    const boundaryBytes = new TextEncoder().encode(`--${boundary}`)
    const parts: { fields: Record<string, string>; files: Record<string, FileType> } = {
        fields: {},
        files: {},
    }

    // Función para buscar el índice de una subcadena en un array de bytes
    function indexOf(source: Uint8Array, target: Uint8Array, start: number = 0): number {
        outer: for (let i = start; i <= source.length - target.length; i++) {
            for (let j = 0; j < target.length; j++) {
                if (source[i + j] !== target[j]) {
                    continue outer
                }
            }
            return i
        }
        return -1
    }

    let pos = 0
    const partStart = indexOf(bytes, boundaryBytes, pos)
    if (partStart === -1) return parts

    pos = partStart + boundaryBytes.length + 2 // Salta \r\n después del boundary

    while (pos < bytes.length) {
        const nextBoundary = indexOf(bytes, boundaryBytes, pos)
        if (nextBoundary === -1) break

        const part = bytes.slice(pos, nextBoundary - 2) // Salta \r\n antes del boundary
        pos = nextBoundary + boundaryBytes.length + 2 // Salta \r\n después del boundary

        const headerEnd = part.indexOf(0x0d) // Encuentra \r
        const headers = new TextDecoder().decode(part.slice(0, headerEnd)).split('\r\n')
        const contentDisposition = headers.find(header => header.startsWith('Content-Disposition'))
        if (!contentDisposition) continue

        const nameMatch = contentDisposition.match(/name="([^"]+)"/)
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/)
        if (!nameMatch) continue

        const name = nameMatch[1]
        if (filenameMatch) {
            // Archivo
            const filename = filenameMatch[1]
            const contentTypeHeader = headers.find(header => header.startsWith('Content-Type'))
            const contentType = contentTypeHeader ? contentTypeHeader.split(': ')[1] : 'application/octet-stream'
            const fileData = part.slice(headerEnd + 4) // Salta \r\n\r\n

            // Guardar el archivo
            const fileExt = path.extname(filename)
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
            if (!allowedExtensions.includes(fileExt.toLowerCase())) {
                throw new Error('Tipo de archivo no permitido')
            }

            const fileName = `${Date.now()}-${path.basename(filename, fileExt)}${fileExt}`
            const filePath = path.join(uploadDir, fileName)
            fs.writeFileSync(filePath, Buffer.from(fileData))
            const imageUrl = `/uploads/${fileName}`

            parts.files[name] = {
                filename,
                contentType,
                path: filePath,
                url: imageUrl,
            }
        } else {
            // Campo
            const value = new TextDecoder().decode(part.slice(headerEnd + 4)) // Salta \r\n\r\n
            parts.fields[name] = value
        }
    }

    return parts
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true, // Incluir categoría relacionada
            },
        })
        return NextResponse.json(products, { status: 200 })
    } catch (error) {
        console.error('Error en GET /api/products:', error)
        return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const parts = await parseMultipartForm(request)
        const { name, price, category, description, emoji, detailedDescription } = parts.fields
        const file = parts.files.image

        // Validar campos requeridos
        if (!name || !price || !category || !description || !emoji || !file) {
            // Eliminar archivo si falta algún campo
            if (file && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
        }

        const imageUrl = file.url

        console.log('Campos recibidos:', parts.fields)
        console.log('Archivo recibido:', parts.files.image)
        console.log('Creando producto con los siguientes datos:', {
            name,
            price: parseFloat(price),
            categoryId: category,
            description,
            detailedDescription: detailedDescription || description,
            emoji,
            image: imageUrl,
        })

        const newProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                category: {
                    connect: { id: String(category) },
                },
                description,
                detailedDescription: detailedDescription || description,
                emoji,
                image: imageUrl,
            },
            include: {
                category: true,
            },
        })

        return NextResponse.json(newProduct, { status: 201 })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        console.error('Error desconocido al crear el producto:', error)
        return NextResponse.json({ error: 'Error al crear el producto' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const parts = await parseMultipartForm(request)
        const { id, name, price, category, description, emoji } = parts.fields
        const file = parts.files.image

        if (!id || !name || !price || !category || !description || !emoji) {
            // Eliminar archivo si falta algún campo
            if (file && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
        }

        // Obtener el producto existente antes de manejar la imagen
        const existingProduct = await prisma.product.findUnique({ where: { id } })
        if (!existingProduct) {
            // Eliminar archivo si el producto no existe
            if (file && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
        }

        let imageUrl: string | undefined = undefined

        if (file) {
            const fileExt = path.extname(file.filename)
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
            if (!allowedExtensions.includes(fileExt.toLowerCase())) {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path)
                }
                return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
            }

            imageUrl = file.url
            console.log('Nueva URL de la imagen:', imageUrl)

            // Eliminar la imagen antigua si existe
            if (existingProduct.image) {
                const oldImagePath = path.join(process.cwd(), 'public', existingProduct.image)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath)
                    console.log('Imagen antigua eliminada:', oldImagePath)
                }
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                price: parseFloat(price),
                categoryId: category,
                description,
                detailedDescription: parts.fields.detailedDescription || description,
                emoji,
                image: imageUrl || existingProduct.image,
            },
            include: {
                category: true,
            },
        })

        console.log('Producto actualizado:', updatedProduct)

        return NextResponse.json(updatedProduct, { status: 200 })
    } catch (error: unknown) {
        console.error(error)
        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            (error as { code: string }).code === 'P2025'
        ) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
        }

        return NextResponse.json({ error: 'Error al actualizar el producto' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
        }

        const product = await prisma.product.findUnique({ where: { id } })
        if (product && product.image) {
            const imagePath = path.join(process.cwd(), 'public', product.image)
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
                console.log('Imagen eliminada:', imagePath)
            }
        }

        await prisma.product.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 })
    } catch (error: unknown) {
        console.error(error)
        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            (error as { code: string }).code === 'P2025'
        ) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
        }
        return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 })
    }
}