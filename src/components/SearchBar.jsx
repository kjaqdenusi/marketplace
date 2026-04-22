import React from 'react'

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      className="form-control w-50"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}

export default SearchBar
