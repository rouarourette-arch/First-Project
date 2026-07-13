import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Profile() {
  const { user } = useAuth();

  // If a user tries to access this page without being logged in, send them to the Auth page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <h1 style={{ fontSize: '2.5rem', color: '#2C2A29', marginBottom: '30px', borderBottom: '2px solid #E0E0E0', paddingBottom: '15px' }}>
        My Account
      </h1>

      {/* Premium Profile Information Card */}
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <h2 style={{ color: '#A67B5B', margin: '0 0 10px 0', fontSize: '1.5rem' }}>Personal Details</h2>
        
        <div style={infoRowStyle}>
          <strong style={{ color: '#757575', width: '150px' }}>Full Name:</strong> 
          <span style={{ color: '#2C2A29', fontWeight: '500' }}>{user.name}</span>
        </div>
        
        <div style={infoRowStyle}>
          <strong style={{ color: '#757575', width: '150px' }}>Email Address:</strong> 
          <span style={{ color: '#2C2A29', fontWeight: '500' }}>{user.email}</span>
        </div>
        
        <div style={infoRowStyle}>
          <strong style={{ color: '#757575', width: '150px' }}>Phone Number:</strong> 
          <span style={{ color: '#2C2A29', fontWeight: '500' }}>{user.phone || 'Not provided'}</span>
        </div>
        
        <div style={infoRowStyle}>
          <strong style={{ color: '#757575', width: '150px' }}>Shipping Address:</strong> 
          <span style={{ color: '#2C2A29', fontWeight: '500' }}>{user.address || 'Not provided'}</span>
        </div>
        
        <div style={{ ...infoRowStyle, borderBottom: 'none' }}>
          <strong style={{ color: '#757575', width: '150px' }}>Account Status:</strong> 
          <span style={{ 
            background: user.role === 'admin' ? 'rgba(166, 123, 91, 0.15)' : '#F9F8F6', 
            color: user.role === 'admin' ? '#A67B5B' : '#757575',
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '0.95rem', 
            fontWeight: '600', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {user.role}
          </span>
        </div>

      </div>
      
      {/* Placeholder for future features to show the professor the app is designed to scale */}
      <div style={{ marginTop: '40px', padding: '30px', background: '#F9F8F6', borderRadius: '16px', border: '2px dashed #E0E0E0', textAlign: 'center' }}>
        <h3 style={{ color: '#2C2A29', margin: '0 0 10px 0' }}>Order History</h3>
        <p style={{ color: '#757575', margin: 0, fontSize: '1.1rem' }}>
          Your previous purchases and tracking information will appear here.
        </p>
      </div>

    </div>
  );
}

// Reusable row styling for clean alignment
const infoRowStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  fontSize: '1.1rem', 
  borderBottom: '1px solid #f0f0f0', 
  paddingBottom: '15px' 
};

export default Profile;