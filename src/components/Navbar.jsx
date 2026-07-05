
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { useCart } from '../context/CartContext'


// const [name, setName] = useState(null)

// useEffect(() => {
//   const storedName = localStorage.getItem("name")
//   setName(storedName)
// }, [])

// // page load pe localStorage check karo
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { totalItems } = useCart()
//   const [name, setName] = useState(localStorage.getItem("name"))
 
//   // agar login hai toh name milega

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("name")
//     setName(null)
//     // token aur name delete karo
//     window.location.href = "/"
//     // home pe redirect karo
//   }
 


//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-rose-600 tracking-wide">
//           LuxeBags
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex gap-8 text-gray-600 font-medium items-center">
//           <li><Link to="/" className="hover:text-rose-600 transition">Home</Link></li>
//           <li><Link to="/products" className="hover:text-rose-600 transition">Products</Link></li>
//           <li>
//             <Link to="/cart" className="hover:text-rose-600 transition relative">
//               Cart 🛒
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-4 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           </li>
//           {name ? (
//             // agar login hai
//             <>
//               <li className="text-rose-600 font-semibold">Hi, {name}! 👋</li>
//               <li>
//                 <button onClick={handleLogout}
//                   className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm hover:bg-rose-700 transition">
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             // agar login nahi hai
//             <>
//               <li><Link to="/login" className="hover:text-rose-600 transition">Login</Link></li>
//               <li>
//                 <Link to="/signup"
//                   className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm hover:bg-rose-700 transition">
//                   Sign Up
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         <button
//           className="md:hidden text-gray-600 text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? '✕' : '☰'}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <ul className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-gray-600 font-medium">
//           <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
//           <li>
//             <Link to="/cart" onClick={() => setMenuOpen(false)}>
//               Cart 🛒 {totalItems > 0 && `(${totalItems})`}
//             </Link>
//           </li>
//           {name ? (
//             <>
//               <li className="text-rose-600 font-semibold">Hi, {name}! 👋</li>
//               <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
//             </>
//           ) : (
//             <>
//               <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
//               <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
//             </>
//           )}
//         </ul>
//       )}
//     </nav>
//   )
// }

// export default Navbar

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'  // ← ADD

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { name, logout } = useAuth()  // ← ADD

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-rose-600 tracking-wide">
          LuxeBags
        </Link>

        <ul className="hidden md:flex gap-8 text-gray-600 font-medium items-center">
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
          {name ? (
            <>
              <li className="text-rose-600 font-semibold">Hi, {name}! 👋</li>
              <li>
                <button onClick={handleLogout}
                  className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm hover:bg-rose-700 transition">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-rose-600 transition">Login</Link></li>
              <li>
                <Link to="/signup"
                  className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm hover:bg-rose-700 transition">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        <button className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}>
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
          {name ? (
            <>
              <li className="text-rose-600 font-semibold">Hi, {name}! 👋</li>
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  )
}

export default Navbar