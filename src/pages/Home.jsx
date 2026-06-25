import { Link } from 'react-router-dom'

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
  return (
    <div>
      <section className="bg-rose-50 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-rose-700 mb-4">
          Carry Your Style 👜
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Premium handbags for every occasion
        </p>
        <Link to="/products" className="bg-rose-600 text-white px-8 py-3 rounded-full text-lg hover:bg-rose-700 transition">
          Shop Now
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-rose-600 font-bold mt-1">₹{product.price}</p>
                <Link to={`/products/${product.id}`} className="mt-4 block text-center bg-rose-100 text-rose-700 py-2 rounded-lg hover:bg-rose-200 transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-400 text-center py-6">
        <p>© 2025 LuxeBags. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home

