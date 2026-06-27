// // src/pages/ProductDetail.jsx

// import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import products from "../pages/product.js";

// export default function ProductDetail() {

//   const { id } = useParams();
//   // reads the id from URL → /product/2 gives id = "2"

//   const { addToCart } = useCart();
//   // grabs addToCart function from CartContext

//   const product = products.find((p) => p.id === Number(id));
//   // Number(id) converts "2" string → 2 number
//   // .find() returns the matching product object

//   if (!product) {
//     return <p className="text-center mt-20 text-gray-500">Product not found.</p>;
//   }
//   // safety check if wrong id in URL

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-12">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-10">

//         {/* Left - Image */}
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full md:w-1/2 h-80 object-cover rounded-xl"
//         />

//         {/* Right - Details */}
//         <div className="flex flex-col justify-center gap-4">

//           <span className="text-sm text-gray-400 uppercase tracking-wide">
//             {product.category}
//           </span>

//           <h1 className="text-3xl font-bold text-gray-800">
//             {product.name}
//           </h1>

//           <p className="text-2xl font-semibold text-black">
//             ₹{product.price.toLocaleString()}
//           </p>

//           <p className="text-gray-500 text-sm">
//             A premium quality handbag crafted for style and durability.
//             Perfect for every occasion.
//           </p>

//           <button
//             onClick={() => addToCart(product)}
//             className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition"
//           >
//             Add to Cart 🛒
//           </button>
//           {/* on click → adds this product to cartItems in CartContext */}

//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/ProductDetail.jsx

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {

  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // API se product fetch karo
  useState(() => {
    fetch(`https://handbags-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    // 2 second baad popup hide ho jayega
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-gray-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-10">

        {/* Left - Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl"
        />

        {/* Right - Details */}
        <div className="flex flex-col justify-center gap-4">

          <span className="text-sm text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-black">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-gray-500 text-sm">
            A premium quality handbag crafted for style and durability.
            Perfect for every occasion.
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition"
          >
            Add to Cart 🛒
          </button>

          {/* Popup */}
          {added && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
              ✅ Added to Cart!
            </div>
          )}

        </div>
      </div>
    </div>
  );
}