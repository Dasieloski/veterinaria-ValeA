'use client'

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

const contactInfo = [
  {
    icon: MapPin,
    text: "La Habana, Cuba",
  },
  {
    icon: Phone,
    text: "+53 123 456 789",
  },
  {
    icon: Mail,
    text: "hola@dasieloski.store",
  },
  {
    icon: Clock,
    text: "Lun-Sáb: 9:00 - 18:00",
  },
]

const quickLinks = [
  { href: "#", text: "Inicio" },
  { href: "#", text: "Productos" },
  { href: "#", text: "Categorías" },
  { href: "#", text: "Ofertas" },
  { href: "#", text: "Sobre Nosotros" },
  { href: "#", text: "Contacto" },
]

export function PremiumFooter() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">✨ Dasieloski Store</h3>
            <p className="text-muted-foreground">
              Tu destino premium para compras en La Habana. Calidad y estilo en
              cada producto.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center gap-2">
                  <info.icon className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{info.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">
              Suscríbete para recibir las últimas novedades y ofertas exclusivas.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="✉️ tu@email.com"
                className="bg-background/50"
              />
              <Button className="w-full bg-background/50">
                ✨ Suscribirme
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground"
        >
          <p>© 2024 Dasieloski Store ✨ Todos los derechos reservados</p>
        </motion.div>
      </div>
    </footer>
  )
}

