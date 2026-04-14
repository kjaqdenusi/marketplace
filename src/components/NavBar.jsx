import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({ searchQuery, setSearchQuery, cartCount }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Marketplace</Link>

      <input
        type="text"
        className="form-control w-50"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Link to="/cart" className="btn btn-warning">
        Cart ({cartCount})
      </Link>
    </nav>
  )
}

export default NavBar
