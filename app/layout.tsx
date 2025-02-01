import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react'
import { CartProvider } from '@/contexts/CartContext'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValeA",
  description: "Venta de productos veterinarios de alta calidad para todo tipo de animales",
  /* icons: {
    icon: "/icons/tower-icon.svg",
    apple: "/icons/tower-icon.svg"
  }, */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
