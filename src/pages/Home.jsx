import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const featuredProducts = [
  { id: 1, name: "Classic Tote", price: 1299, category: "Tote", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 2, name: "Sling Bag", price: 899, category: "Sling", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 3, name: "Luxury Clutch", price: 1599, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 4, name: "Shoulder Bag", price: 1199, category: "Shoulder", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 5, name: "Mini Backpack", price: 999, category: "Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 6, name: "Evening Clutch", price: 1899, category: "Clutch", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { id: 7, name: "Boho Tote", price: 1099, category: "Tote", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400" },
  { id: 8, name: "Chain Sling", price: 1399, category: "Sling", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?w=400" },
  { id: 9, name: "Leather Shoulder", price: 1799, category: "Shoulder", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" },
  { id: 10, name: "City Backpack", price: 1499, category: "Backpack", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400" },
  { id: 11, name: "Pearl Clutch", price: 2099, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 12, name: "Canvas Tote", price: 799, category: "Tote", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 13, name: "Crossbody Sling", price: 1099, category: "Sling", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 14, name: "Velvet Clutch", price: 1699, category: "Clutch", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { id: 15, name: "Travel Backpack", price: 1999, category: "Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 16, name: "Suede Shoulder", price: 1599, category: "Shoulder", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 17, name: "Woven Tote", price: 949, category: "Tote", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400" },
  { id: 18, name: "Flap Sling", price: 1249, category: "Sling", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?w=400" },
  { id: 19, name: "Bridal Clutch", price: 2499, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 20, name: "Office Tote", price: 1349, category: "Tote", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 21, name: "Gym Backpack", price: 849, category: "Backpack", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400" },
  { id: 22, name: "Party Clutch", price: 1799, category: "Clutch", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { id: 23, name: "Rope Shoulder", price: 1099, category: "Shoulder", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" },
  { id: 24, name: "Bucket Bag", price: 1299, category: "Shoulder", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 25, name: "Mini Sling", price: 699, category: "Sling", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 26, name: "Laptop Backpack", price: 2199, category: "Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 27, name: "Printed Tote", price: 899, category: "Tote", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400" },
  { id: 28, name: "Gold Clutch", price: 2299, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 29, name: "Tan Shoulder", price: 1499, category: "Shoulder", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" },
  { id: 30, name: "Denim Sling", price: 999, category: "Sling", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?w=400" },
  { id: 31, name: "Beach Tote", price: 749, category: "Tote", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 32, name: "Hiking Backpack", price: 2499, category: "Backpack", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400" },
  { id: 33, name: "Sequin Clutch", price: 1999, category: "Clutch", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { id: 34, name: "Knot Shoulder", price: 1299, category: "Shoulder", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 35, name: "Stripe Sling", price: 1149, category: "Sling", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 36, name: "Jute Tote", price: 649, category: "Tote", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400" },
  { id: 37, name: "School Backpack", price: 1099, category: "Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 38, name: "Satin Clutch", price: 1799, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 39, name: "Hobo Shoulder", price: 1399, category: "Shoulder", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" },
  { id: 40, name: "Camo Sling", price: 949, category: "Sling", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?w=400" },
  { id: 41, name: "Market Tote", price: 699, category: "Tote", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 42, name: "Vintage Backpack", price: 1799, category: "Backpack", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400" },
  { id: 43, name: "Bow Clutch", price: 1599, category: "Clutch", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
  { id: 44, name: "Fringe Shoulder", price: 1699, category: "Shoulder", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { id: 45, name: "Quilted Sling", price: 1299, category: "Sling", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 46, name: "Linen Tote", price: 849, category: "Tote", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=400" },
  { id: 47, name: "Anti-Theft Backpack", price: 2299, category: "Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 48, name: "Floral Clutch", price: 1499, category: "Clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 49, name: "Saddle Shoulder", price: 1899, category: "Shoulder", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400" },
  { id: 50, name: "Patchwork Sling", price: 1099, category: "Sling", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d0e?w=400" },
];

const Home = () => {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  // API se featured products fetch karo
  useEffect(() => {
    fetch("https://handbags-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.slice(0, 8))
        // sirf pehle 8 products home pe dikhao
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categories = [
    { name: "Tote", emoji: "👜", color: "bg-rose-100" },
    { name: "Sling", emoji: "👝", color: "bg-purple-100" },
    { name: "Clutch", emoji: "💼", color: "bg-yellow-100" },
    { name: "Shoulder", emoji: "🎒", color: "bg-green-100" },
    { name: "Backpack", emoji: "🎽", color: "bg-blue-100" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-rose-600 to-rose-400 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {/* Left — Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Carry Your <br />
              <span className="text-yellow-300">Style! 👜</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8">
              Premium handbags for every occasion — Totes, Clutches, Slings & more!
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/products"
                className="bg-white text-rose-600 px-8 py-3 rounded-full font-bold hover:bg-rose-50 transition shadow-lg">
                Shop Now 🛍️
              </Link>
              <Link to="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-rose-500 transition">
                View All
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
              alt="LuxeBags Hero"
              className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl border-4 border-white"
            />
          </div>

        </div>
      </section>

      {/* OFFERS BANNER */}
      <section className="bg-yellow-400 py-3 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-800">
          <span>🚚 Free Delivery on all orders</span>
          <span>↩️ 7 Day Easy Returns</span>
          <span>✅ 100% Authentic Products</span>
          <span>💳 Secure Payments via Razorpay</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?search=${cat.name}`}
              className={`${cat.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition shadow-sm`}
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured Collection ✨
          </h2>
          <Link to="/products"
            className="text-rose-600 text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 uppercase">{product.category}</p>
                  <h3 className="text-sm font-semibold text-gray-800 mt-1 truncate">{product.name}</h3>
                  <p className="text-rose-600 font-bold mt-1">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WHY LUXEBAGS */}
      <section className="bg-white py-12 px-6 mt-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Why LuxeBags? 💎
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Free Delivery", desc: "On all orders" },
              { icon: "💎", title: "Premium Quality", desc: "100% authentic" },
              { icon: "↩️", title: "Easy Returns", desc: "7 day returns" },
              { icon: "🔒", title: "Secure Payment", desc: "Razorpay secured" },
            ].map((item) => (
              <div key={item.title} className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-rose-50 transition">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-bold text-gray-800 mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-6 mt-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-2">LuxeBags 👜</h3>
            <p className="text-sm">Premium handbags for every occasion.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Quick Links</h3>
            <div className="flex flex-col gap-1 text-sm">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/products" className="hover:text-white transition">Products</Link>
              <Link to="/cart" className="hover:text-white transition">Cart</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Contact</h3>
            <p className="text-sm">📧 support@luxebags.com</p>
            <p className="text-sm">📞 +91 99999 99999</p>
            <p className="text-sm">📍 Lucknow, India</p>
          </div>
        </div>
        <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
          © 2025 LuxeBags. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default Home