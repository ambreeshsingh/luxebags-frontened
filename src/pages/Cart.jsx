// src/pages/Cart.jsx

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart();
  // grabbing everything we need from CartContext

  const navigate = useNavigate();

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold text-gray-600">Your cart is empty 🛒</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Cart 🛒
      </h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">

        {/* Cart Items List */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-4 flex items-center gap-6"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            // small thumbnail of the product

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <p className="text-black font-bold mt-1">
                ₹{item.price.toLocaleString()} × {item.quantity}
                // shows price × quantity like ₹1,299 × 2
              </p>
            </div>

            {/* Subtotal + Remove */}
            <div className="text-right flex flex-col gap-2">
              <p className="font-bold text-lg">
                ₹{(item.price * item.quantity).toLocaleString()}
                // subtotal for this item
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>

          </div>
        ))}

        {/* Total Section */}
        <div className="bg-white rounded-2xl shadow p-6 mt-4">
          <div className="flex justify-between text-lg font-semibold text-gray-700 mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-black mb-6">
            <span>Total Price</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg"
          >
            Proceed to Checkout →
          </button>
        </div>

      </div>
    </div>
  );
}