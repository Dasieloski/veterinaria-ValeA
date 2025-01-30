import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'USD 💵', rate: 1 },
  { name: 'CUP 🇨🇺', rate: 24 },
  { name: 'MLC 💳', rate: 1 },
  { name: 'EUR 💶', rate: 0.85 },
]

export function CurrencyExchangeRates() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">💱 Tasas de Cambio</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rate" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

