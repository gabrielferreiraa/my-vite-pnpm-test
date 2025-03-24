import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const addProduct = (product) => {
    setProducts([...products, product])
  }

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ))
  }

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return { products, addProduct, updateProduct, deleteProduct }
}