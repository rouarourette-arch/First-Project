import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Contact from "./pages/Contact"

function App() {
  return (
    <>
     <Router>
        <Navbar/>
        <main style={{ minHeight:'80vh',padding:'20px' }}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/contact" element={< Contact/>}/>
        </Routes>
        </main>
        <Footer />
     </Router>
    
    </>
  )
}

export default App
