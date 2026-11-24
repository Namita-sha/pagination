function ProductCard({ title, price, thumbnail, category }) {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p className="category">{category}</p>
      <p className="price">${price}</p>
    </div>
  )
}

export default ProductCard