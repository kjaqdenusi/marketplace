import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-secondary mt-2">Back to Home</Link>
      </div>
    )
  }

  const handleAddToCart = async () => {
    await onAddToCart(product)
    navigate('/cart')
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">← Back</Link>
      <div className="row">
        <div className="col-md-5">
          <img src={product.image} alt={product.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <h4 style={{ color: '#B12704' }}>${product.price.toFixed(2)}</h4>
          <p className="mt-3">{product.description}</p>
          <p>In Stock</p>
          <button className="btn btn-warning mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
