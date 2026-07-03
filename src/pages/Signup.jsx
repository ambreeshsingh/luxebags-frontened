import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://handbags-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created ✅ Ab login karo!");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up 🎉
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <input type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <input type="password" name="password" placeholder="Password"
            value={form.password} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Pehle se account hai?{" "}
            <Link to="/login" className="text-rose-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}