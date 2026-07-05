import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // login check karo
    if (!name) {
      navigate("/login");
      return;
    }

    fetch("https://handbags-backend.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading orders...</p>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold text-gray-600">No orders yet! 📦</p>
      <button onClick={() => navigate("/products")}
        className="bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition">
        Shop Now 🛍️
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          📦 My Orders
        </h1>

        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id}
              className="bg-white rounded-2xl shadow p-5">

              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-mono text-gray-600">#{order._id.slice(-8).toUpperCase()}</p>
                  {/* sirf last 8 characters dikhao */}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    {/* date Indian format mein */}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                    }`}>
                    {order.status}
                    {/* status badge — yellow/green/blue */}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="my-3" />

              {/* Order Footer */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <p className="text-xs text-gray-400">Delivery Address</p>
                  <p className="text-sm text-gray-600">
                    {order.city}, {order.state} - {order.pincode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Paid</p>
                  <p className="text-lg font-bold text-rose-600">
                    ₹{order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}