'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Electrónicos 📱', value: 10 },
  { name: 'Ropa 👕', value: 15 },
  { name: 'Hogar 🏠', value: 8 },
  { name: 'Deportes ⚽', value: 12 },
  { name: 'Libros 📚', value: 5 },
  { name: 'Juguetes 🧸', value: 7 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export function ProductsByCategoryChart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🛍️ Distribución de Productos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

