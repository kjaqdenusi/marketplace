import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Card from './components/Card'
import Cart from './components/Cart'

const API_URL = 'http://localhost:5000'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch all products from json-server on load
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  // Fetch cart from json-server on load (persists across refreshes)
  useEffect(() => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(data => setCart(data))
  }, [])

  // Add to cart — POST if new, PATCH if already in cart
  const addToCart = async (product) => {
    const existing = cart.find(item => item.productId === product.id)

    if (existing) {
      const res = await fetch(`${API_URL}/cart/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: existing.quantity + 1 }),
      })
      const updated = await res.json()
      setCart(cart.map(item => (item.id === existing.id ? updated : item)))
    } else {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      })
      const newItem = await res.json()
      setCart([...cart, newItem])
    }
  }

  // Remove item from cart — DELETE
  const removeFromCart = async (id) => {
    await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' })
    setCart(cart.filter(item => item.id !== id))
  }

  // Update quantity — PATCH (remove if quantity drops to 0)
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    const res = await fetch(`${API_URL}/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    })
    const updated = await res.json()
    setCart(cart.map(item => (item.id === id ? updated : item)))
  }

  // Filter products by search query
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Carousel — only show on the main browse page, not during search */}
              {searchQuery === '' && (
                <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="https://picsum.photos/seed/banner1/1200/350" className="d-block w-100" alt="Sale 1" style={{ height: 350, objectFit: 'cover' }} />
                      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                        <h3>Top Deals Today</h3>
                        <p>Save big on everyday essentials.</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="https://picsum.photos/seed/banner2/1200/350" className="d-block w-100" alt="Sale 2" style={{ height: 350, objectFit: 'cover' }} />
                      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                        <h3>New Arrivals</h3>
                        <p>Fresh products added every week.</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="https://picsum.photos/seed/banner3/1200/350" className="d-block w-100" alt="Sale 3" style={{ height: 350, objectFit: 'cover' }} />
                      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                        <h3>Free Shipping</h3>
                        <p>On orders over $25.</p>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              )}

              <div className="container py-4">
                <h5 className="mb-3">{searchQuery ? `Results for "${searchQuery}"` : 'All Products'}</h5>
                {filteredProducts.length === 0 ? (
                  <p className="text-muted">No products found.</p>
                ) : (
                  <div className="row g-4">
                    {filteredProducts.map(product => (
                      <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                        <Card product={product} onAddToCart={addToCart} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
