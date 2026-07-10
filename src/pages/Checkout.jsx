

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const { cartItems, totalPrice, clearCart } = useCart();

export default function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { name } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [form, setForm] = useState({
    customerName: name || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: localStorage.getItem("address") || "",
    city: localStorage.getItem("city") || "",
    state: localStorage.getItem("state") || "",
    pincode: localStorage.getItem("pincode") || "",
  });
  // Profile mein save kiya address auto fill hoga! ✅

  const [errors, setErrors] = useState({});
  // errors object — har field ka error track karega

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    // jab type karo → error clear ho jaye
  };

  // PINCODE SE CITY/STATE AUTO FILL
  const handlePincode = async (e) => {
    const pin = e.target.value;
    setForm({ ...form, pincode: pin });

    if (pin.length === 6) {
      // 6 digit pincode hone pe API call karo
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setForm((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
            pincode: pin,
            // city aur state auto fill!
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // LIVE LOCATION
const handleLocation = () => {
  if (!navigator.geolocation) {
    alert("Location not supported ");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    // GPS se lat/lng lo

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      // OpenStreetMap se address fetch karo

      const address = data.address;
      setForm((prev) => ({
        ...prev,
        address: `${address.road || ""} ${address.suburb || ""}`.trim(),
        city: address.city || address.town || address.village || "",
        state: address.state || "",
        pincode: address.postcode || "",
        // form automatically fill!
      }));

      alert("Location is detected ✅");
    } catch (err) {
      alert("Location not fetched ");
    }
  }, () => {
    alert("give permission for location");
  });
};


  // ADDRESS VALIDATION
  const validateAddress = () => {
    const newErrors = {};
    if (!form.customerName) newErrors.customerName = "Name required!";
    if (!form.email.includes("@")) newErrors.email = "Please enter valid email!";
    if (form.phone.length !== 10) newErrors.phone = "Please enter 10 digit phone number";
    if (!form.address) newErrors.address = "Address required!";
    if (form.pincode.length !== 6) newErrors.pincode = "Valid valid pincode!";
    if (!form.city) newErrors.city = "City required!";
    if (!form.state) newErrors.state = "State required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    // agar koi error nahi → true return karo
  };

  // RAZORPAY PAYMENT
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://handbags-backend.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_T8cDcRFkJwqYJl",
        amount: order.amount,
        currency: "INR",
        name: "LuxeBags",
        description: "Premium Handbags",
        order_id: order.id,
        handler: async function (response) {
          clearCart();  
          navigate("/order-success"); 
          const orderData = {
            ...form,
            items: cartItems.map((item) => ({
              productId: item.id || item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
            totalPrice,
            paymentId: response.razorpay_payment_id,
          };

          await fetch("https://handbags-backend.onrender.com/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          alert("Payment Successful! Order Placed 🎉");
          navigate("/");
        },
        prefill: {
          name: form.customerName,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#be123c" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  // CART EMPTY CHECK
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold text-gray-600">Cart empty hai! 🛒</p>
        <button onClick={() => navigate("/products")}
          className="bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition">
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      {/* Steps Indicator — Flipkart jaisa */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-2">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${step >= 1 ? "bg-rose-600 text-white" : "bg-gray-300 text-gray-600"}`}>
          1. Delivery Address
        </div>
        <div className="flex-1 h-1 bg-gray-300">
          <div className={`h-1 bg-rose-600 transition-all ${step >= 2 ? "w-full" : "w-0"}`}></div>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${step >= 2 ? "bg-rose-600 text-white" : "bg-gray-300 text-gray-600"}`}>
          2. Payment
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left — Main Content */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Saved Addresses */}
{JSON.parse(localStorage.getItem("addresses") || "[]").length > 0 && (
  <div className="mb-4">
    <p className="text-sm font-semibold text-gray-700 mb-2">📍 Saved Addresses:</p>
    {JSON.parse(localStorage.getItem("addresses") || "[]").map((addr) => (
      <div key={addr.id}
        onClick={() => setForm((prev) => ({
          ...prev,
          customerName: addr.name,
          phone: addr.phone,
          address: addr.address,
          city: addr.city,
          state: addr.state,
          pincode: addr.pincode,
        }))}
        className="border border-gray-200 rounded-xl p-3 mb-2 cursor-pointer hover:border-rose-600 hover:bg-rose-50 transition"
      >
        <p className="text-sm font-semibold">{addr.name} — {addr.type}</p>
        <p className="text-xs text-gray-500">{addr.address}, {addr.city}</p>
      </div>
    ))}
  </div>
)}

          {/* STEP 1 — ADDRESS */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📍 Delivery Address
              </h2>

              <div className="flex flex-col gap-3">
        {/* Use Saved Address Button — YAHAN ADD KARO */}
        {localStorage.getItem("address") && (
        <button
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              address: localStorage.getItem("address") || "",
              city: localStorage.getItem("city") || "",
              state: localStorage.getItem("state") || "",
              pincode: localStorage.getItem("pincode") || "",
              phone: localStorage.getItem("phone") || "",
              email: localStorage.getItem("email") || "",
            }));
          }}
          className="w-full flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-600 py-3 rounded-xl hover:bg-rose-50 transition font-medium"
        >
          📍 Use Saved Address
        </button>
      )}


                {/* Name */}
                <div>
                  <input type="text" name="customerName" placeholder="Full Name"
                    value={form.customerName} onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${errors.customerName ? "border-red-500" : "border-gray-300 focus:border-rose-600"}`}
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                {/* Email + Phone */}
               {/* Email + Phone */}
<div className="grid grid-cols-2 gap-3">
  <div>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
        errors.email
          ? "border-red-500"
          : "border-gray-300 focus:border-rose-600"
      }`}
    />
    {errors.email && (
      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
    )}
  </div>

  <div>
    <input
      type="tel"
      name="phone"
      placeholder="10 digit Phone"
      value={form.phone}
      onChange={handleChange}
      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
        errors.phone
          ? "border-red-500"
          : "border-gray-300 focus:border-rose-600"
      }`}
    />
    {errors.phone && (
      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
    )}
  </div>
</div>

<button
  type="button"
  onClick={handleLocation}
  className="w-full flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-600 py-3 rounded-xl hover:bg-rose-50 transition font-medium mb-3"
>
  📍 Use My Current Location
</button>

{/* Pincode — auto fills city/state */}
<div>
  <input
    type="text"
    name="pincode"
    placeholder="Pincode"
    value={form.pincode}
    onChange={handlePincode}
    maxLength={6}
    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${
      errors.pincode
        ? "border-red-500"
        : "border-gray-300 focus:border-rose-600"
    }`}
  />
  {errors.pincode && (
    <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
  )}
</div>
      

                {/* City + State — auto filled */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input type="text" name="city" placeholder="City"
                      value={form.city} onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${errors.city ? "border-red-500" : "border-gray-300 focus:border-rose-600"}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <input type="text" name="state" placeholder="State"
                      value={form.state} onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none ${errors.state ? "border-red-500" : "border-gray-300 focus:border-rose-600"}`}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <textarea name="address" placeholder="House No, Street, Area"
                    value={form.address} onChange={handleChange} rows={3}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none ${errors.address ? "border-red-500" : "border-gray-300 focus:border-rose-600"}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => {
                    if (validateAddress()) setStep(2);
                    // validate karo → tabhi step 2 pe jao
                  }}
                  className="w-full bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition font-medium"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                💳 Payment
              </h2>
    
              {/* Address Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{form.customerName}</p>
                    <p className="text-sm text-gray-600">{form.address}</p>
                    <p className="text-sm text-gray-600">{form.city}, {form.state} - {form.pincode}</p>
                    <p className="text-sm text-gray-600">📞 {form.phone}</p>
                  </div>
                  <button onClick={() => setStep(1)}
                    className="text-rose-600 text-sm hover:underline">
                    Change
                  </button>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition font-medium disabled:opacity-50"
              >
                {loading ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()} 💳`}
              </button>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            🛍️ Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item.id || item._id} className="flex gap-3 mb-3">
              <img src={item.image} alt={item.name}
                className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-bold text-gray-800">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600 mb-1">
            <span>Delivery</span>
            <span>FREE ✅</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}