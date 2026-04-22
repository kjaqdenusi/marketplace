import React from 'react'
import { Link } from 'react-router-dom'

function ShoppingCart({ cart, onRemove, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">Keep Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      <ul className="list-group mt-3">
        {cart.map(item => (
          <li key={item.id} className="list-group-item">
            <img src={item.image} alt={item.name} style={{ width: 80, height: 60 }} />
            <span className="ms-3">{item.name}</span>
            <span className="ms-3">${item.price.toFixed(2)} each</span>

            <div className="d-inline ms-4">
              <button className="btn btn-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              <span className="mx-2">{item.quantity}</span>
              <button className="btn btn-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <span className="ms-4"><strong>${(item.price * item.quantity).toFixed(2)}</strong></span>

            <button className="btn btn-danger btn-sm ms-4" onClick={() => onRemove(item.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      <h4 className="mt-4">Total: ${total.toFixed(2)}</h4>
      <Link to="/" className="btn btn-secondary me-2">Continue Shopping</Link>
      <button className="btn btn-success">Proceed to Checkout</button>
    </div>
  )
}

export default ShoppingCart
