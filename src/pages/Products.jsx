// // src/pages/Products.jsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import products from "./ProductDetail.jsx";
// const categories = ["All", "Tote", "Sling", "Clutch", "Shoulder", "Backpack"];
// // All possible filter buttons at the top

// export default function Products() {
//   const [selected, setSelected] = useState("All");
//   // 'selected' tracks which category filter is active. Default = "All"

//   const navigate = useNavigate();
//   // useNavigate lets us go to another page on button click

//   const filtered = selected === "All"
//     ? products
//     : products.filter((p) => p.category === selected);
//   // If "All" is selected → show everything
//   // Else → only show products whose category matches

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">

//       {/* Page Title */}
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
//         Our Collection
//       </h1>
//       <p className="text-center text-gray-500 mb-8">
//         Find the perfect bag for every occasion
//       </p>

//       {/* Filter Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 mb-10">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelected(cat)}
//             className={`px-4 py-2 rounded-full border text-sm font-medium transition
//               ${selected === cat
//                 ? "bg-black text-white border-black"
//                 : "bg-white text-gray-600 border-gray-300 hover:border-black"
//               }`}
//           >
//             {cat}
//           </button>
//           // Active filter → black bg. Inactive → white with hover effect
//         ))}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {filtered.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
//           >
//             {/* Product Image */}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-64 object-cover hover:scale-105 transition duration-300"
//             />

//             {/* Card Info */}
//             <div className="p-4">
//               <span className="text-xs text-gray-400 uppercase tracking-wide">
//                 {product.category}
//               </span>
//               {/* Small category label like "TOTE" or "SLING" */}

//               <h2 className="text-lg font-semibold text-gray-800 mt-1">
//                 {product.name}
//               </h2>

//               <p className="text-black font-bold text-xl mt-1">
//                 ₹{product.price.toLocaleString()}
//                 {/* toLocaleString → turns 1299 into "1,299" */}
//               </p>

//               <button
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 className="mt-4 w-full bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition"
//               >
//                 View Details
//               </button>
//               {/* Goes to /product/1, /product/2 etc. */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// src/pages/Products.jsx


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Tote", "Sling", "Clutch", "Shoulder", "Backpack"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://handbags-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filtered = selected === "All"
    ? products
    : products.filter((p) => p.category === selected);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Our Collection
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Find the perfect bag for every occasion
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition
              ${selected === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300 hover:border-black"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover hover:scale-105 transition duration-300"
            />
            <div className="p-4">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {product.category}
              </span>
              <h2 className="text-lg font-semibold text-gray-800 mt-1">
                {product.name}
              </h2>
              <p className="text-black font-bold text-xl mt-1">
                ₹{product.price.toLocaleString()}
              </p>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="mt-4 w-full bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}