import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Package, PlusCircle, Search } from 'lucide-react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import StockReport from './components/StockReport'
import { useProducts } from './hooks/useProducts'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { darkMode, toggleDarkMode } = useTheme()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  
  // Internal use, used to capture errors. Do not delete.
  useEffect(() => {
    window.addEventListener('error', function ({ message, filename, lineno, colno, error }) {
      window.parent.postMessage({
        type: 'error',
        message: message,
        line: lineno,
        column: colno,
        stack: error ? error.stack : null
      }, '*');
    });

    return () => {
      window.removeEventListener('error', () => {});
    };
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              Stock Control
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductList
              products={filteredProducts}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
            />
          </div>
          <div>
            <StockReport products={products} />
          </div>
        </div>

        {/* Add Product Modal */}
        <AnimatePresence>
          {isAddingProduct && (
            <ProductForm
              onClose={() => setIsAddingProduct(false)}
              onSubmit={addProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}