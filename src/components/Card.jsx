import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Card({ product, onAddToCart }) {
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    await onAddToCart(product)
    navigate('/cart')
  }

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button className="btn btn-warning w-100" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card
