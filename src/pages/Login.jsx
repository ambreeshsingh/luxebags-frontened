// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("https://handbags-backend.onrender.com/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("name", data.name);
//         alert(`Welcome back ${data.name}! 🎉`);
//         window.location.href = "/"; 
//         // token save karo localStorage mein
       
      
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError("Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Login 👋
//         </h1>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//         )}

//         <div className="flex flex-col gap-4">
//           <input type="email" name="email" placeholder="Email Address"
//             value={form.email} onChange={handleChange}
//             className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
//           />
//           <input type="password" name="password" placeholder="Password"
//             value={form.password} onChange={handleChange}
//             className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
//           />
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center text-sm text-gray-500">
//             Account nahi hai?{" "}
//             <Link to="/signup" className="text-rose-600 font-medium hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();  // ← ADD
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {

    if (!form.email.includes("@")) {
      setError("Valid email daalo!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye!");
      return;
    }
  
    setLoading(true);
    try {
      const res = await fetch("https://handbags-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.name, data.token);  // ← CHANGE
        alert(`Welcome back ${data.name}! 🎉`);
        navigate("/");  // ← navigate use karo
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
          Login 👋
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="flex flex-col gap-4">
          <input type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <input type="password" name="password" placeholder="Password"
            value={form.password} onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Account nahi hai?{" "}
            <Link to="/signup" className="text-rose-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}