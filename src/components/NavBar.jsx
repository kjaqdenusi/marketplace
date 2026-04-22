import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function NavBar({ searchQuery, setSearchQuery, cartCount }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Marketplace</Link>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Link to="/cart" className="btn btn-warning">
        Cart ({cartCount})
      </Link>
    </nav>
  )
}

export default NavBar
