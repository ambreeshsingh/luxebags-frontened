import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState("")
  const { totalItems } = useCart()
  const { name, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${search}`)
      setMenuOpen(false)
    }
  }

  return (
    <nav className="bg-rose-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide min-w-fit">
          LuxeBags 👜
        </Link>

        {/* Search Bar */}
       {/* Search Bar */}
<div className="flex-1 flex items-center bg-white rounded-sm overflow-hidden">
  <input
    type="text"
    placeholder="Search for bags, clutches, totes..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      navigate(`/products?search=${e.target.value}`);
      // type karte hi products page pe search query bhejo
    }}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
  />
  <button
    onClick={handleSearch}
    className="bg-rose-600 px-4 py-2 text-white text-sm hover:bg-rose-700">
    🔍
  </button>
</div>
         
        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 min-w-fit">

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-white text-sm font-medium hover:text-rose-200 transition"
            >
              {name ? `Hello, ${name}` : "Login"} ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                {name ? (
                  <>
                    <div className="px-4 py-3 bg-rose-50 border-b">
                      <p className="text-sm font-semibold text-gray-800">{name}</p>
                      <p className="text-xs text-gray-500">Welcome back! 👋</p>
                    </div>
                    <Link to="/orders"                        // ← ADD
             onClick={() => setDropdownOpen(false)}
           className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50">
           📦 My Orders
         </Link>
                    <button
                      onClick={() => { handleLogout(); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 flex gap-2">
                      <Link to="/login"
                        onClick={() => setDropdownOpen(false)}
                        className="flex-1 text-center bg-rose-600 text-white py-1 rounded text-sm hover:bg-rose-700">
                        Login
                      </Link>
                      <Link to="/signup"
                        onClick={() => setDropdownOpen(false)}
                        className="flex-1 text-center border border-rose-600 text-rose-600 py-1 rounded text-sm hover:bg-rose-50">
                        Sign Up
                      </Link>
                    </div>
                    <hr />
                    <Link to="/signup"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50">
                      ✨ New Customer? Sign Up
                    </Link>

                    <Link to="/profile"
  onClick={() => setDropdownOpen(false)}
  className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50">
  👤 My Profile
</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-2 text-white text-sm font-medium hover:text-rose-200 transition relative">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/products" className="text-white text-sm font-medium hover:text-rose-200 transition">
            Products
          </Link>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 flex flex-col gap-3">
          <div className="flex">
            <input
              type="text"
              placeholder="Search bags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none"
            />
            <button onClick={handleSearch} className="bg-rose-600 text-white px-3 rounded-r text-sm">
              🔍
            </button>
          </div>
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">🏠 Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">🛍️ Products</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">
            🛒 Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
          {name ? (
            <>
              <p className="text-rose-600 text-sm font-semibold">👋 Hello, {name}!</p>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">📦 My Orders</Link> 
              <button onClick={handleLogout} className="text-left text-red-500 text-sm">🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">🔑 Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm">✨ Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar