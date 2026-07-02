

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    setLoading(true);

    const orderData = {
      ...form,
      // spread form data — name, email, phone etc.
      items: cartItems.map((item) => ({
        // productId: item._id,
        productId: item.id || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("https://handbags-backend.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        // sends order data to backend
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully! 🎉");
        navigate("/");
        // go to home after order
      }
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Checkout
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left - Form */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Delivery Details
          </h2>

          <input type="text" name="customerName" placeholder="Full Name"
            value={form.customerName} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <input type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <input type="tel" name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <textarea name="address" placeholder="Full Address"
            value={form.address} onChange={handleChange} rows={3}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black resize-none"
          />
          <div className="flex gap-3">
            <input type="text" name="city" placeholder="City"
              value={form.city} onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-1/2 focus:outline-none focus:border-black"
            />
            <input type="text" name="pincode" placeholder="Pincode"
              value={form.pincode} onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-1/2 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item.id || item._id} className="flex justify-between text-sm text-gray-600">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <hr className="my-2" />

          <div className="flex justify-between font-bold text-lg text-black">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg disabled:opacity-50"
          >
            {loading ? "Placing Order..." : `Place Order ₹${totalPrice.toLocaleString()}`}
          </button>

        </div>
      </div>
    </div>
  );
}