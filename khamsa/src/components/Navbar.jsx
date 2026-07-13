import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@admin.com');

  return (
    <nav style={{
      display: 'flex', 
      justifyContent: "space-between", 
      padding: '15px 40px', 
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      
      <div className="logo">
        <Link to="/" style={{color: '#A67B5B', fontSize: '28px', fontWeight: '700', textDecoration: "none", letterSpacing: '-1px'}}>
          khamsa.
        </Link>
      </div>
      
      <ul style={{display: 'flex', listStyle: "none", gap: "30px", margin: 0, padding: 0, alignItems: 'center', fontWeight: '500'}}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        
        {/* NEW LOGIC: Only show Contact if the user is NOT an admin */}
        {!isAdmin && (
          <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
        )}
        
        {user ? (
          <>
            {isAdmin && (
              <li>
                <Link to="/admin" style={{...linkStyle, color: '#A67B5B', background: 'rgba(166, 123, 91, 0.1)', padding: '6px 12px', borderRadius: '20px'}}>
                  👑 Admin
                </Link>
              </li>
            )}
            
            <li><Link to="/profile" style={linkStyle}>Profile ({user.name})</Link></li>
            <li>
              <button onClick={handleLogout} style={{background: 'transparent', color: '#757575', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0, fontWeight: '500', boxShadow: 'none'}}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/auth" style={{...linkStyle, color: '#fff', background: '#A67B5B', padding: '8px 20px', borderRadius: '25px'}}>Login / Register</Link></li>
        )}
      </ul>

      {/* Only show Cart if NOT admin */}
      {!isAdmin && (
        <Link to="/cart" style={{ textDecoration: 'none', color: '#333' }}>
          <div className="panier" style={{ cursor: "pointer", display: 'flex', alignItems: 'center', background: '#F9F8F6', padding: '8px 16px', borderRadius: '25px', border: '1px solid #E0E0E0', transition: 'all 0.3s ease' }}>
            <span style={{fontSize: '18px', marginRight: '8px'}}>🛒</span> 
            <span style={{fontWeight: '600', color: '#2C2A29'}}>{totalItems}</span>
          </div>
        </Link>
      )}

    </nav>
  );
}

const linkStyle = { color: "#2C2A29", textDecoration: 'none', transition: 'color 0.2s ease' };
export default Navbar;