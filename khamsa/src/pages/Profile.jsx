import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/Home/ProductCard'; // Reusing your existing component

function Profile() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Security check: Redirect to auth if not logged in
  useEffect(() => {
    if (!user) navigate('/auth');
    else setEditData({ phone: user.phone || '', address: user.address || '' });
  }, [user, navigate]);

  // Fetch the user's specific products
  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!user) return;
      try {
        const response = await fetch('https://6a50f1e6c576c846dcba0844.mockapi.io/Products');
        const allProducts = await response.json();
        // Assuming your MockAPI products have a 'userId' field linking them to users
        const filtered = allProducts.filter(p => p.userId === user.id);
        setMyProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch user products", err);
      }
    };
    fetchMyProducts();
  }, [user]);

  // Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://6a50f1e6c576c846dcba0844.mockapi.io/Users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, phone: editData.phone, address: editData.address })
      });
      
      if (!response.ok) throw new Error("Update failed");
      
      const updatedUser = await response.json();
      login(updatedUser); // Update the global context with new data
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null; // Prevents flashing before redirect

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* PROFILE INFO SECTION */}
        <div style={{ flex: '1', minWidth: '300px', background: '#f5f5f5', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
          <h3>My Information</h3>
          {isEditing ? (
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <label>Phone:</label>
              <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} style={{ padding: '8px' }} />
              <label>Address:</label>
              <input type="text" value={editData.address} onChange={(e) => setEditData({...editData, address: e.target.value})} style={{ padding: '8px' }} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" disabled={isLoading} style={{ flex: 1, padding: '8px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '8px', background: '#ccc', border: 'none', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          ) : (
            <div style={{ marginTop: '15px', lineHeight: '1.8' }}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
              <button onClick={() => setIsEditing(true)} style={{ marginTop: '15px', padding: '8px 15px', background: '#8B4513', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* MY PRODUCTS SECTION */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h3>My Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '15px' }}>
            {myProducts.length === 0 ? (
              <p>You haven't posted any products yet.</p>
            ) : (
              myProducts.map(product => (
                <ProductCard key={product.id} product={product} onViewDetails={() => {}} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;