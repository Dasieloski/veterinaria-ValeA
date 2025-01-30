export interface ProductImage {
  id: number
  url: string
  alt: string
}

export interface Product {
  id: number
  name: string
  price: number
  images: ProductImage[]
  category: string
  description: string
  detailedDescription: string
  specifications: string[]
  emoji: string
}

