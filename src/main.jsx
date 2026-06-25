// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'  // ← ADD THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>   {/* ← WRAP HERE */}
      <App />
    </CartProvider>  {/* ← CLOSE HERE */}
  </StrictMode>,
)