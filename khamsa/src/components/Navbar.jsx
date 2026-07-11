import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // 1. Import useCart

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart(); // 2. Get the total items count
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{display:'flex', justifyContent:"space-between", padding:'15px 30px', background:'#8B4513', color:'#fff', alignItems: 'center'}}>
      <div className="logo">
        <Link to="/" style={{color:'#fff', fontSize:'24px', fontWeight:'bold', textDecoration:"none"}}>khamsa</Link>
      </div>
      
      <ul style={{display:'flex', listStyle: "none", gap:"20px", margin:0, padding:0, alignItems: 'center'}}>
        <li><Link to="/" style={{color:"#fff", textDecoration:'none'}}>Home</Link></li>
        <li><Link to="/contact" style={{color:"#fff", textDecoration:'none'}}>Contact Us</Link></li>
        
        {user ? (
          <>
            <li><Link to="/profile" style={{color:"#fff", textDecoration:'none'}}>My Profile ({user.name})</Link></li>
            <li>
              <button onClick={handleLogout} style={{background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0}}>Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/auth" style={{color:"#fff", textDecoration:'none'}}>Login / Register</Link></li>
        )}
      </ul>

      <div className="panier" style={{cursor:"pointer", display: 'flex', alignItems: 'center'}}>
        🛒 
        {/* 3. Replace '0' with the dynamic totalItems */}
        <span style={{background:'red', borderRadius:'50%', padding:'2px 6px', fontSize:"12px", marginLeft: '5px'}}>
          {totalItems}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;