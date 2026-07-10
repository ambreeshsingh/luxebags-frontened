import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // 5 second baad home pe redirect
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Placed! 🎉
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for shopping with LuxeBags! Your order is confirmed and will be delivered soon.
        </p>

        {/* Delivery Info */}
        <div className="bg-rose-50 rounded-xl p-4 mb-6">
          <p className="text-rose-600 font-semibold">🚚 Estimated Delivery</p>
          <p className="text-gray-600 text-sm mt-1">3-5 Business Days</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 border-2 border-rose-600 text-rose-600 py-3 rounded-xl hover:bg-rose-50 transition font-medium"
          >
            📦 My Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition font-medium"
          >
            🛍️ Shop More
          </button>
        </div>

        <p className="text-gray-400 text-xs mt-4">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
}