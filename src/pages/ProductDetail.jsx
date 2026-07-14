import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  // quantity selector

  useEffect(() => {
    if (!isNaN(id)) {
      // local file se
      import("../pages/product.js").then((module) => {
        const products = module.default;
        const found = products.find((p) => p.id === Number(id));
        setProduct(found);
        setLoading(false);
      });
    } else {
      // API se
      fetch(`https://handbags-backend.onrender.com/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // quantity ke hisaab se add karo
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl text-gray-500">Product not found! 😢</p>
      <button onClick={() => navigate("/products")}
        className="bg-rose-600 text-white px-6 py-2 rounded-xl">
        Back to Products
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span onClick={() => navigate("/")} className="cursor-pointer hover:text-rose-600">Home</span>
          {" → "}
          <span onClick={() => navigate("/products")} className="cursor-pointer hover:text-rose-600">Products</span>
          {" → "}
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8">

          {/* Left — Image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow"
            />
          </div>

          {/* Right — Details */}
          <div className="md:w-1/2 flex flex-col gap-4">

            {/* Category Badge */}
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                ⭐ 4.5
              </div>
              <span className="text-gray-500 text-sm">128 ratings</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-gray-800">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-gray-400 line-through text-lg">
                ₹{(product.price * 1.2).toLocaleString()}
              </p>
              <span className="text-green-600 font-semibold text-sm">
                20% off
              </span>
            </div>

            {/* Free Delivery */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-700 text-sm font-medium">
                🚚 Free Delivery on this item
              </p>
              <p className="text-green-600 text-xs mt-1">
                Estimated delivery: 3-5 business days
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              A premium quality {product.category.toLowerCase()} bag crafted for style and durability.
              Perfect for every occasion — whether it's a casual outing or a formal event.
              Made with high-quality materials that ensure longevity.
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-700">Quantity:</p>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-xl font-bold hover:bg-yellow-500 transition"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Success Message */}
            {added && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm text-center">
                ✅ Added to Cart!
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: "🔒", text: "Secure Payment" },
                { icon: "↩️", text: "7 Day Returns" },
                { icon: "💎", text: "Premium Quality" },
                { icon: "✅", text: "100% Authentic" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}