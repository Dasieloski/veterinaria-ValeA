export interface Category {
  id: string
  name: string
  emoji: string
  gradient?: string
}

export const categories: Category[] = [
  { id: "todos", name: "Todos", emoji: "🌟", gradient: "from-pink-500 to-purple-500" },
  { id: "tecnologia", name: "Tecnología", emoji: "💻", gradient: "from-blue-500 to-cyan-500" },
  { id: "deportes", name: "Deportes", emoji: "⚽", gradient: "from-green-500 to-emerald-500" },
  { id: "comida", name: "Comida", emoji: "🍕", gradient: "from-orange-500 to-red-500" },
  { id: "musica", name: "Música", emoji: "🎵", gradient: "from-violet-500 to-purple-500" },
  { id: "fotografia", name: "Fotografía", emoji: "📸", gradient: "from-yellow-500 to-orange-500" }
]
