import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // 1. Import CartProvider
import Cart from "./pages/Cart";
function App() {
  return (
    <AuthProvider>
      {/* 2. Wrap the Router inside the CartProvider */}
      <CartProvider>
        <Router>
          <Navbar />
          <main style={{ minHeight: '80vh', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;