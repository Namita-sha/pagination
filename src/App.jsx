import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)


  const skip = (currentPage - 1) * limit
  const totalPages = Math.ceil(total / limit)

  useEffect(() => {
    async function getProducts() {
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      const data = await res.json()
      setProducts(data.products)
      setTotal(data.total)
    }
    getProducts()
  }, [limit, skip])

  //when user picks new limiit to show
  function handleLimitChange(e) {
    setLimit(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className="container">
      <h1>Products (Page {currentPage})</h1>


      <div className="grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            category={product.category} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <label>
        Show:{" "}
        <select value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
    </div>
  )
}
export default App