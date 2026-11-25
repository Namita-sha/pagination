import type { Product } from '../types'

type Props = {
  products: Product[]
}

function ProductTable({ products }: Props) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <img src={product.thumbnail} alt={product.title} width="50" />
            </td>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>{product.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable