'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface SearchProductsProps {
  onSearch: (term: string) => void
}

export function SearchProducts({ onSearch }: SearchProductsProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-9 w-full md:w-[300px]"
      />
    </div>
  )
}

