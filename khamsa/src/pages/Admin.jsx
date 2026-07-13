import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Admin() {
  const { user } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); 
  const [isLoading, setIsLoading] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', image_url: '', price: '', quantity: '', category: 'Clothing', description: '' });

  const API_PRODUCTS = 'https://6a50f1e6c576c846dcba0844.mockapi.io/Products';
  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@admin.com');

  useEffect(() => {
    if (isAdmin) {
      fetchAllProducts();
      loadMessages();
    }
  }, [isAdmin]);

  const fetchAllProducts = async () => {
    try {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) { console.error("Error fetching products", err); }
  };

  const loadMessages = () => {
    const savedMessages = JSON.parse(localStorage.getItem('khamsa_inbox') || '[]');
    setMessages(savedMessages);
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('khamsa_inbox', JSON.stringify(updatedMessages));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(API_PRODUCTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productForm, price: Number(productForm.price), quantity: Number(productForm.quantity) })
      });
      setProductForm({ name: '', image_url: '', price: '', quantity: '', category: 'Clothing', description: '' });
      fetchAllProducts(); 
    } catch (err) { alert("Error adding product"); } 
    finally { setIsLoading(false); }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Admin: Delete this product permanently?")) return;
    try {
      await fetch(`${API_PRODUCTS}/${id}`, { method: 'DELETE' });
      fetchAllProducts(); 
    } catch (err) { alert("Failed to delete product."); }
  };

  if (!isAdmin) return <Navigate to="/" />;

  const totalValue = allProducts.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity || 1)), 0);

  return (
    <div style={{ background: '#F9F8F6', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* THE NEW DARK COMMAND CENTER HEADER */}
      <div style={{ background: '#1E1E1E', color: 'white', padding: '40px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>Command Center</h1>
              <p style={{ color: '#A0A0A0', margin: 0, fontSize: '1.1rem' }}>Secure Admin Environment • {user.name}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={statCardDark}>
                <span style={statLabelDark}>Active Listings</span>
                <span style={statValueDark}>{allProducts.length}</span>
              </div>
              <div style={statCardDark}>
                <span style={statLabelDark}>Inventory Value</span>
                <span style={{...statValueDark, color: '#A67B5B'}}>{totalValue.toFixed(2)} <span style={{fontSize: '1rem'}}>TND</span></span>
              </div>
              <div style={{...statCardDark, border: messages.length > 0 ? '1px solid #ff4d4f' : '1px solid #333'}}>
                <span style={statLabelDark}>Inbox Alerts</span>
                <span style={{...statValueDark, color: messages.length > 0 ? '#ff4d4f' : '#fff'}}>{messages.length}</span>
              </div>
            </div>
          </div>

          {/* Dark Theme Tabs */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
            <button onClick={() => setActiveTab('inventory')} style={activeTab === 'inventory' ? activeTabDark : inactiveTabDark}>
              🛍️ Inventory Management
            </button>
            <button onClick={() => setActiveTab('inbox')} style={activeTab === 'inbox' ? activeTabDark : inactiveTabDark}>
              📨 Customer Inbox {messages.length > 0 && <span style={{ background: '#ff4d4f', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', marginLeft: '5px' }}>{messages.length}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT AREA (Kept white/light for your teammate's readability) */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        
        {/* --- TAB 1: INVENTORY MANAGEMENT --- */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
            
            <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid #E0E0E0' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2C2A29', fontSize: '1.4rem' }}>Publish New Item</h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" name="name" placeholder="Product Name" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} style={inputStyle} />
                <input type="text" name="image_url" placeholder="Image URL (http://...)" required value={productForm.image_url} onChange={e => setProductForm({...productForm, image_url: e.target.value})} style={inputStyle} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="number" name="price" placeholder="Price" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} style={inputStyle} />
                  <input type="number" name="quantity" placeholder="Qty" required value={productForm.quantity} onChange={e => setProductForm({...productForm, quantity: e.target.value})} style={inputStyle} />
                </div>
                <select name="category" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} style={inputStyle}>
                  <option value="Clothing">Clothing</option>
                  <option value="Decor">Decor</option>
                  <option value="Pottery">Pottery</option>
                </select>
                <button type="submit" disabled={isLoading} style={{ padding: '14px', background: '#A67B5B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1.1rem', marginTop: '10px', transition: 'all 0.2s ease' }}>
                  {isLoading ? 'Processing...' : '+ Add to Database'}
                </button>
              </form>
            </div>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {allProducts.map(product => (
                  <div key={product.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid #E0E0E0' }}>
                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px' }}>
                      <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#2C2A29', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                      <p style={{ margin: '0 0 15px 0', color: '#A67B5B', fontWeight: '700', fontSize: '1.1rem' }}>{product.price} TND</p>
                      <button onClick={() => handleDeleteProduct(product.id)} style={{ width: '100%', padding: '10px', background: '#FFF0F0', color: '#ff4d4f', border: '1px solid #ff4d4f', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s ease' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: CUSTOMER INBOX --- */}
        {activeTab === 'inbox' && (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid #E0E0E0' }}>
            <h3 style={{ margin: '0 0 25px 0', color: '#2C2A29', fontSize: '1.5rem' }}>Inbox ({messages.length})</h3>
            
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#757575' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '15px' }}>📭</span>
                <p style={{ fontSize: '1.2rem' }}>All caught up! No pending messages.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ border: '1px solid #E0E0E0', borderRadius: '12px', padding: '25px', background: '#FAFAFA' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #E0E0E0', paddingBottom: '15px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 8px 0', color: '#2C2A29', fontSize: '1.3rem' }}>{msg.subject}</h4>
                        <p style={{ margin: 0, fontSize: '1rem', color: '#757575' }}>From: <strong>{msg.name}</strong> ({msg.email}) • {msg.date}</p>
                      </div>
                      <span style={{ background: '#2C2A29', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', height: 'fit-content', fontWeight: '500' }}>{msg.topic}</span>
                    </div>
                    <p style={{ color: '#2C2A29', lineHeight: '1.7', margin: '0 0 25px 0', fontSize: '1.1rem' }}>"{msg.message}"</p>
                    <button onClick={() => handleDeleteMessage(msg.id)} style={{ padding: '10px 20px', background: 'transparent', color: '#ff4d4f', border: '2px solid #ff4d4f', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                      ✓ Mark as Resolved
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Styles
const statCardDark = { background: '#2A2A2A', padding: '15px 25px', borderRadius: '12px', border: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '160px' };
const statLabelDark = { fontSize: '0.85rem', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', marginBottom: '5px' };
const statValueDark = { fontSize: '1.8rem', fontWeight: '700', color: '#fff' };

const activeTabDark = { padding: '12px 24px', background: '#A67B5B', color: 'white', border: 'none', borderRadius: '8px 8px 0 0', fontSize: '1.05rem', fontWeight: '600', cursor: 'pointer' };
const inactiveTabDark = { padding: '12px 24px', background: 'transparent', color: '#A0A0A0', border: 'none', borderRadius: '8px 8px 0 0', fontSize: '1.05rem', fontWeight: '600', cursor: 'pointer' };

const inputStyle = { padding: '12px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '1rem', background: '#FAFAFA' };

export default Admin;