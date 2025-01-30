'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Currency } from '@prisma/client'

interface CurrencySelectorProps {
  selectedCurrency: Currency
  onCurrencyChange: (currency: Currency) => void
  currencies: Currency[]
  loading: boolean
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange, currencies, loading }: CurrencySelectorProps) {
  
  const handleCurrencyChange = (code: string) => {
    const currency = currencies.find(c => c.code === code)
    if (currency) {
      onCurrencyChange(currency)
      localStorage.setItem('selectedCurrency', JSON.stringify(currency))
    }
  }

  if (loading) {
    return <div>Cargando monedas...</div>
  }

  if (!selectedCurrency) {
    return <div>No se ha seleccionado ninguna moneda.</div>
  }

  return (
    <Select value={selectedCurrency.code} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-22">
        <SelectValue placeholder="Moneda" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.id} value={currency.code}>
            {currency.symbol} {currency.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

