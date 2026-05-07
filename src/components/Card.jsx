import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Card({ product, onAddToCart, cartItem, onRemove, onUpdateQuantity }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const quantity = cartItem ? cartItem.quantity : 0

  const wrap = async (fn) => {
    if (isUpdating) return
    setIsUpdating(true)
    await fn()
    setIsUpdating(false)
  }

  const handleAdd = () => wrap(() => onAddToCart(product))
  const handleIncrement = () => wrap(() => onUpdateQuantity(cartItem.id, quantity + 1))
  const handleDecrement = () => wrap(() =>
    quantity === 1 ? onRemove(cartItem.id) : onUpdateQuantity(cartItem.id, quantity - 1)
  )

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>

        {quantity === 0 ? (
          <button className="btn btn-warning w-100" onClick={handleAdd} disabled={isUpdating}>
            Add to Cart
          </button>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDecrement}
              disabled={isUpdating}
            >
              {quantity === 1 ? <i className="bi bi-trash"></i> : '−'}
            </button>
            <span className="fw-bold">{quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleIncrement}
              disabled={isUpdating}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
