// src/pages/ProductDetail.jsx

// import { useParams } from "react-router-dom";


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import localProducts from "../pages/product.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // agar id number hai (1,2,3) → local file se dhundho
    if (!isNaN(id)) {
      const found = localProducts.find((p) => p.id === Number(id));
      setProduct(found);
      setLoading(false);
    } else {
      // MongoDB _id hai → API se fetch karo
      fetch(`https://handbags-backend.onrender.com/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-10">
        <img src={product.image} alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl" />
        <div className="flex flex-col justify-center gap-4">
          <span className="text-sm text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-black">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">
            A premium quality handbag crafted for style and durability.
          </p>
          <button
            onClick={() => {
              addToCart(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition">
            Add to Cart 🛒
          </button>
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