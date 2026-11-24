import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import Pagination from './components/Pagination'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const skip = (currentPage - 1) * limit
  const totalPages = Math.ceil(total / limit)

  useEffect(() => {
    async function getProducts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        if (!res.ok) {
          throw new Error("Server error")
        }
        const data = await res.json()
        setProducts(data.products)
        setTotal(data.total)
      } catch (err) {
        setError("Could not load products. Please try again.")
      } finally {
        setLoading(false)
      }
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


      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              category={product.category}
            />
          ))}
        </div>
      )}

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