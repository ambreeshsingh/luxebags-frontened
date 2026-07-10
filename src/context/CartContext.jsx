// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
    // page load pe localStorage se cart lo
  });

  // jab bhi cartItems change ho → localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id || item._id === product._id);
      // id ya _id dono check karo
      if (exists) {
        return prev.map((item) =>
          (item.id === product.id || item._id === product._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id && item._id !== id));
    // id ya _id dono se remove karo
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    // cart empty karo aur localStorage se bhi hatao
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems, totalPrice,clearCart  }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}