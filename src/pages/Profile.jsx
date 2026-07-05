import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { name } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: name || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: localStorage.getItem("address") || "",
    city: localStorage.getItem("city") || "",
    state: localStorage.getItem("state") || "",
    pincode: localStorage.getItem("pincode") || "",
  });
  // localStorage se saved data lo

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // localStorage mein save karo
    localStorage.setItem("email", form.email);
    localStorage.setItem("phone", form.phone);
    localStorage.setItem("address", form.address);
    localStorage.setItem("city", form.city);
    localStorage.setItem("state", form.state);
    localStorage.setItem("pincode", form.pincode);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // 2 second baad message hide ho jayega
  };

  // Pincode se city/state auto fill
  const handlePincode = async (e) => {
    const pin = e.target.value;
    setForm({ ...form, pincode: pin });

    if (pin.length === 6) {
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
          }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!name) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
            {/* naam ka pehla letter */}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <p className="text-sm text-gray-500">My Profile</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📝 Personal Details
          </h2>

          <div className="flex flex-col gap-3">

            {/* Name */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
              <input type="text" name="name" value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone</label>
              <input type="tel" name="phone" value={form.phone}
                placeholder="10 digit phone number"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
              />
            </div>

            <hr className="my-2" />

            <h2 className="text-lg font-bold text-gray-800">
              📍 Saved Address
            </h2>

            {/* Pincode */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Pincode</label>
              <input type="text" name="pincode" value={form.pincode}
                onChange={handlePincode} maxLength={6}
                placeholder="Enter pincode — city/state auto fill"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">City</label>
                <input type="text" name="city" value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">State</label>
                <input type="text" name="state" value={form.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Address</label>
              <textarea name="address" value={form.address}
                onChange={handleChange} rows={3}
                placeholder="House No, Street, Area"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600 resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700 transition font-medium"
            >
              Save Profile ✅
            </button>

            {/* Success Message */}
            {saved && (
              <div className="bg-green-100 text-green-700 text-center py-2 rounded-xl text-sm">
                ✅ Profile saved successfully!
              </div>
            )}

          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow p-4 mt-4 flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 border border-rose-600 text-rose-600 py-2 rounded-xl text-sm hover:bg-rose-50 transition">
            📦 My Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex-1 bg-rose-600 text-white py-2 rounded-xl text-sm hover:bg-rose-700 transition">
            🛍️ Shop Now
          </button>
        </div>

      </div>
    </div>
  );
}