'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Category {
  id: string
  name: string
  emoji: string
  gradient?: string
  description: string
}

const gradientOptions = [
  { label: "Azul a Cian", value: "from-blue-500 to-cyan-500" },
  { label: "Rosa a Púrpura", value: "from-pink-500 to-purple-500" },
  { label: "Verde a Esmeralda", value: "from-green-500 to-emerald-500" },
  { label: "Naranja a Rojo", value: "from-orange-500 to-red-500" },
  { label: "Violeta a Púrpura", value: "from-violet-500 to-purple-500" },
  { label: "Amarillo a Naranja", value: "from-yellow-500 to-orange-500" },
  { label: "Rojo a Rosa", value: "from-red-500 to-pink-500" },
  { label: "Cian a Verde", value: "from-cyan-500 to-green-500" },
  { label: "Púrpura a Azul", value: "from-purple-500 to-blue-500" },
  { label: "Esmeralda a Verde", value: "from-emerald-500 to-green-500" },
  { label: "Gris a Negro", value: "from-gray-500 to-black-500" },
  { label: "Lima a Verde", value: "from-lime-500 to-green-500" },
  { label: "Rosa a Naranja", value: "from-pink-500 to-orange-500" },
  { label: "Cian a Azul", value: "from-cyan-500 to-blue-500" },
  { label: "Amarillo a Verde", value: "from-yellow-500 to-green-500" },
  { label: "Rojo a Naranja", value: "from-red-500 to-orange-500" },
  { label: "Azul a Violeta", value: "from-blue-500 to-violet-500" },
  { label: "Naranja a Amarillo", value: "from-orange-500 to-yellow-500" },
  { label: "Púrpura a Rosa", value: "from-purple-500 to-pink-500" },
  { label: "Verde a Lima", value: "from-green-500 to-lime-500" },
  { label: "Negro a Gris", value: "from-black-500 to-gray-500" },
];


export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    gradient: '',
    description: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      if (editingCategory) {
        // Editar categoría
        const res = await fetch('/api/categories', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: editingCategory.id,
            name: formData.name,
            emoji: formData.emoji,
            gradient: formData.gradient,
            description: formData.description
          })
        })

        if (res.ok) {
          const updatedCategory = await res.json()
          setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat))
          setIsOpen(false)
          setEditingCategory(null)
          setFormData({ name: '', emoji: '', gradient: '', description: '' })
          setSuccess('Categoría actualizada exitosamente')
        } else {
          const errorData = await res.json()
          console.error('Error al editar la categoría:', errorData.error)
          setError('Error al editar la categoría')
        }
      } else {
        // Crear nueva categoría
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (res.ok) {
          const newCategory = await res.json()
          setCategories([...categories, newCategory])
          setIsOpen(false)
          setFormData({ name: '', emoji: '', gradient: '', description: '' })
          setSuccess('Categoría creada exitosamente')
        } else {
          const errorData = await res.json()
          console.error('Error al crear la categoría:', errorData.error)
          setError('Error al crear la categoría')
        }
      }
    } catch (error) {
      console.error('Error en el manejo del formulario:', error)
      setError('Error en el manejo del formulario')
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      emoji: category.emoji,
      gradient: category.gradient || '',
      description: category.description
    })
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return

    try {
      const res = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (res.ok) {
        setCategories(categories.filter(cat => cat.id !== id))
      } else {
        const errorData = await res.json()
        console.error('Error al eliminar la categoría:', errorData.error)
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📁 Gestión de Categorías</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>✨ {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</Button>
          </DialogTrigger>
          <DialogContent aria-describedby="category-form-description">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? '✏️ Editar Categoría' : '✨ Nueva Categoría'}
              </DialogTitle>
              <DialogDescription id="category-form-description">
                {editingCategory
                  ? 'Modifica los detalles de la categoría aquí. Todos los campos son requeridos.'
                  : 'Añade una nueva categoría. Todos los campos son requeridos.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                  {success}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tecnología"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  name="emoji"
                  value={formData.emoji}
                  onChange={handleInputChange}
                  placeholder="🚀"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradient">Gradiente (Opcional)</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, gradient: value })}
                  defaultValue={formData.gradient}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un gradiente" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-4 h-4 bg-gradient-to-r ${option.value} rounded`}></span>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripción de la categoría..."
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingCategory ? '💾 Guardar Cambios' : '✨ Crear Categoría'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-6xl">{category.emoji}</span>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.description}
                      </p>
                      {category.gradient && (
                        <div className="mt-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded inline-block">
                            Gradiente: <span className={`bg-gradient-to-r ${category.gradient} px-2 py-1 rounded`}></span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 pt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(category)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

