import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin"; // 1. Imported the Admin page
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main style={{ minHeight: '80vh', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} /> {/* 2. Added the Route */}
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;