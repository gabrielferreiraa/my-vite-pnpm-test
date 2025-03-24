import React from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductList({ products, onUpdate, onDelete }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDelete(id)
      toast.success('Product deleted successfully')
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6">Product Inventory</h2>
      <div className="space-y-4">
        {products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">SKU: {product.sku}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-sm">
                    Quantity: <strong>{product.quantity}</strong>
                  </span>
                  <span className="text-sm">
                    Supplier: <strong>{product.supplier}</strong>
                  </span>
                </div>
                {product.quantity <= 10 && (
                  <div className="mt-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Low stock alert</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdate(product)}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No products found. Add some products to get started!
          </div>
        )}
      </div>
    </div>
  )
}