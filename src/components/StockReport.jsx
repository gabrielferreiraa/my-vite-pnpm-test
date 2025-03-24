import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Package, AlertTriangle, TrendingUp } from 'lucide-react'

export default function StockReport({ products }) {
  const lowStockItems = products.filter(p => p.quantity <= 10)
  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0)
  
  const chartData = products
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map(p => ({
      name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
      quantity: p.quantity
    }))

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Stock</p>
              <p className="text-xl font-semibold">{totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Low Stock Items</p>
              <p className="text-xl font-semibold">{lowStockItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Chart */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold">Stock Levels</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            {lowStockItems.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      Only {item.quantity} units left
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                    Reorder needed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}