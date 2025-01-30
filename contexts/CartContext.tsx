'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  emoji: string
  image: string
}

export type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  getCartTotal: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  

  // Cargar el carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })).filter(item => !isNaN(item.price) && !isNaN(item.quantity)) // Filtrar ítems inválidos
      setCart(parsedCart)
    }
  }, [])

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    console.log('Agregar al carrito:', item)
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    console.log(`Removiendo del carrito: ID ${id}`)
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    const total = cart.reduce((acc, item) => {
      const price = Number(item.price)
      const quantity = Number(item.quantity)

      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Precio o cantidad no válido para el ítem: ${item.name}`)
        return acc
      }

      return acc + price * quantity
    }, 0)
    console.log(`Total Calculado en CartContext: ${total}`)
    return total
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}