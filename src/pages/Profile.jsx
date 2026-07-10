import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { name } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: localStorage.getItem("name") || "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    type: "Home",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handlePincode = async (e) => {
    const pin = e.target.value;
    setNewAddress({ ...newAddress, pincode: pin });
    if (pin.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setNewAddress((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
            pincode: pin,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.pincode) {
      alert("Saari details bharo!");
      return;
    }
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setNewAddress({
      name: localStorage.getItem("name") || "",
      phone: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
      type: "Home",
    });
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-white text-2xl font-bold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <p className="text-sm text-gray-500">My Profile</p>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">📍 My Addresses</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-rose-700 transition"
            >
              + Add New
            </button>
          </div>

          {/* Saved Addresses List */}
          {addresses.length === 0 && !showForm && (
            <p className="text-gray-500 text-sm text-center py-4">
              No saved addresses yet! Add one below 👇
            </p>
          )}

          {addresses.map((addr) => (
            <div key={addr.id}
              className="border border-gray-200 rounded-xl p-4 mb-3 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block
                    ${addr.type === "Home" ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"}`}>
                    {addr.type === "Home" ? "🏠 Home" : "💼 Work"}
                  </span>
                  <p className="font-semibold text-gray-800 mt-1">{addr.name}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-gray-600">📞 {addr.phone}</p>
                </div>
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-red-500 text-sm hover:underline ml-2"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}

          {/* Add New Address Form */}
          {showForm && (
            <div className="border border-rose-200 rounded-xl p-4 mt-3">
              <h3 className="font-semibold text-gray-800 mb-3">New Address</h3>

              {/* Type */}
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => setNewAddress({ ...newAddress, type: "Home" })}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition
                    ${newAddress.type === "Home" ? "border-rose-600 text-rose-600 bg-rose-50" : "border-gray-300 text-gray-600"}`}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => setNewAddress({ ...newAddress, type: "Work" })}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition
                    ${newAddress.type === "Work" ? "border-blue-600 text-blue-600 bg-blue-50" : "border-gray-300 text-gray-600"}`}
                >
                  💼 Work
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input type="text" name="name" placeholder="Full Name"
                  value={newAddress.name} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                />
                <input type="tel" name="phone" placeholder="Phone Number"
                  value={newAddress.phone} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                />
                <input type="text" name="pincode" placeholder="Pincode"
                  value={newAddress.pincode} onChange={handlePincode} maxLength={6}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="city" placeholder="City"
                    value={newAddress.city} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                  />
                  <input type="text" name="state" placeholder="State"
                    value={newAddress.state} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                  />
                </div>
                <textarea name="address" placeholder="House No, Street, Area"
                  value={newAddress.address} onChange={handleChange} rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600 resize-none"
                />

                <div className="flex gap-3">
                  <button onClick={saveAddress}
                    className="flex-1 bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition font-medium">
                    Save Address ✅
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {saved && (
            <div className="bg-green-100 text-green-700 text-center py-2 rounded-xl text-sm mt-3">
              ✅ Address saved!
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow p-4 flex gap-3">
          <button onClick={() => navigate("/orders")}
            className="flex-1 border border-rose-600 text-rose-600 py-2 rounded-xl text-sm hover:bg-rose-50 transition">
            📦 My Orders
          </button>
          <button onClick={() => navigate("/products")}
            className="flex-1 bg-rose-600 text-white py-2 rounded-xl text-sm hover:bg-rose-700 transition">
            🛍️ Shop Now
          </button>
        </div>

      </div>
    </div>
  );
}