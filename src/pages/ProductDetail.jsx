import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { name } = useAuth();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "", image: "" });

  useEffect(() => {
    if (!isNaN(id)) {
      import("../pages/product.js").then((module) => {
        const products = module.default;
        const found = products.find((p) => p.id === Number(id));
        setProduct(found);
        setLoading(false);
      });
    } else {
      fetch(`https://handbags-backend.onrender.com/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://handbags-backend.onrender.com/api/reviews/${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch(() => {});
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const submitReview = async () => {
    if (!review.comment) {
      alert("Review likho!");
      return;
    }
    try {
      await fetch("https://handbags-backend.onrender.com/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          userName: name || "Anonymous",
          rating: review.rating,
          comment: review.comment,
          image: review.image,
        }),
      });
      alert("Review submitted! ✅");
      setShowReviewForm(false);
      setReview({ rating: 5, comment: "", image: "" });
      fetch(`https://handbags-backend.onrender.com/api/reviews/${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    } catch (err) {
      alert("Something went wrong!");
    }
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

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8">

          {/* Left — Image */}
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow" />
          </div>

          {/* Right — Details */}
          <div className="md:w-1/2 flex flex-col gap-4">

            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                ⭐ {reviews.length > 0
                  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                  : "4.5"}
              </div>
              <span className="text-gray-500 text-sm">{reviews.length} ratings</span>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-gray-800">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-gray-400 line-through text-lg">
                ₹{(product.price * 1.2).toLocaleString()}
              </p>
              <span className="text-green-600 font-semibold text-sm">20% off</span>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-700 text-sm font-medium">🚚 Free Delivery on this item</p>
              <p className="text-green-600 text-xs mt-1">Estimated delivery: 3-5 business days</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              A premium quality {product.category.toLowerCase()} bag crafted for style and durability.
              Perfect for every occasion.
            </p>

            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-700">Quantity:</p>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-bold">−</button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-lg font-bold">+</button>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <button onClick={handleAddToCart}
                className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-xl font-bold hover:bg-yellow-500 transition">
                🛒 Add to Cart
              </button>
              <button onClick={() => { handleAddToCart(); navigate("/cart"); }}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition">
                ⚡ Buy Now
              </button>
            </div>

            {added && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm text-center">
                ✅ Added to Cart!
              </div>
            )}

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

        {/* REVIEWS SECTION */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              ⭐ Customer Reviews ({reviews.length})
            </h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-rose-700 transition"
            >
              + Write Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="border border-rose-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Write Your Review</h3>

              <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star}
                    onClick={() => setReview({ ...review, rating: star })}
                    className={`text-2xl ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </button>
                ))}
                <span className="text-sm text-gray-500 ml-2">{review.rating}/5</span>
              </div>

              <textarea
                placeholder="Apna experience share karo..."
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600 resize-none mb-3"
              />

              <input
                type="text"
                placeholder="Image URL (optional)"
                value={review.image}
                onChange={(e) => setReview({ ...review, image: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-600 mb-3"
              />

              <div className="flex gap-3">
                <button onClick={submitReview}
                  className="flex-1 bg-rose-600 text-white py-2 rounded-xl hover:bg-rose-700 transition text-sm font-medium">
                  Submit Review ✅
                </button>
                <button onClick={() => setShowReviewForm(false)}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl hover:bg-gray-50 transition text-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No reviews yet — be the first to review! 😊
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((r) => (
                <div key={r._id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{r.userName}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}
                            className={`text-sm ${star <= r.rating ? "text-yellow-400" : "text-gray-300"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                  {r.image && (
                    <img src={r.image} alt="review"
                      className="w-24 h-24 object-cover rounded-xl mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}