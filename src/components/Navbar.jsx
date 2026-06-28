// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { useCart } from '../context/CartContext'  

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)  // for mobile hamburger menu

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       {/* Main container - centers content and adds padding */}
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

//         {/* Logo / Brand name */}
//         <Link to="/" className="text-2xl font-bold text-rose-600 tracking-wide">
//           LuxeBags
//         </Link>

//         {/* Desktop Links - hidden on mobile */}
//         <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
//           <li><Link to="/" className="hover:text-rose-600 transition">Home</Link></li>
//           <li><Link to="/products" className="hover:text-rose-600 transition">Products</Link></li>
//           <li><Link to="/cart" className="hover:text-rose-600 transition">Cart 🛒</Link></li>
//         </ul>

//         {/* Mobile Hamburger Button - only shows on small screens */}
//         <button
//           className="md:hidden text-gray-600 text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}  // toggles menu open/close
//         >
//           {menuOpen ? '✕' : '☰'}
//         </button>

//       </div>

//       {/* Mobile Dropdown Menu - shows only when menuOpen is true */}
//       {menuOpen && (
//         <ul className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-gray-600 font-medium">
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
//           <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart 🛒</Link></li>
//         </ul>
//       )}
//     </nav>
//   )
// }

// export default Navbar

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()  // ← ADD

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-rose-600 tracking-wide">
          LuxeBags
        </Link>

        <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
          <li><Link to="/" className="hover:text-rose-600 transition">Home</Link></li>
          <li><Link to="/products" className="hover:text-rose-600 transition">Products</Link></li>
          <li>
            <Link to="/cart" className="hover:text-rose-600 transition relative">
              Cart 🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-gray-600 font-medium">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
          <li>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart 🛒 {totalItems > 0 && `(${totalItems})`}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar