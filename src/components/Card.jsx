import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ product, onAddToCart }) {
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    await onAddToCart(product)
    navigate('/cart')
  }

  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p><strong>${product.price.toFixed(2)}</strong></p>
        <button className="btn btn-warning" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card
