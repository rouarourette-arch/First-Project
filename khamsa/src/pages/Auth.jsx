import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://6a50f1e6c576c846dcba0844.mockapi.io/Users';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const response = await fetch(API_URL);
        const users = await response.json();
        
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          login(user);
          navigate('/profile'); // Redirect to dashboard
        } else {
          setError('Invalid email or password');
        }
      } else {
        // --- REGISTER LOGIC ---
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to register');
        
        const newUser = await response.json();
        login(newUser);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <div style={{ width: '400px', padding: '30px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Login to Khamsa' : 'Create an Account'}
        </h2>
        
        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} style={inputStyle} />
          )}
          
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} style={inputStyle} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} style={inputStyle} />
          
          {!isLogin && (
            <>
              <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} style={inputStyle} />
              <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} style={inputStyle} />
            </>
          )}

          <button type="submit" disabled={isLoading} style={{ padding: '10px', background: '#8B4513', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#0066cc' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
        </p>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };

export default Auth;