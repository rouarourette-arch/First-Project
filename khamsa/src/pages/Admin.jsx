import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Admin() {
  const { user } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', image_url: '', price: '', quantity: '', category: 'Clothing', description: '' });

  const API_PRODUCTS = 'https://6a50f1e6c576c846dcba0844.mockapi.io/Products';

  // Security: Check if user is an admin OR using the presentation cheat code email
  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@admin.com');

  useEffect(() => {
    if (isAdmin) fetchAllProducts();
  }, [isAdmin]);

  const fetchAllProducts = async () => {
    try {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setAllProducts(data);
    } catch (err) { console.error("Error fetching products", err); }
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
      fetchAllProducts(); // Refresh list
      alert("Product added successfully!");
    } catch (err) { alert("Error adding product"); } 
    finally { setIsLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Admin: Are you sure you want to delete this product from the marketplace?")) return;
    try {
      await fetch(`${API_PRODUCTS}/${id}`, { method: 'DELETE' });
      fetchAllProducts(); // Refresh list
    } catch (err) { alert("Failed to delete product."); }
  };

  // If a normal client tries to access this page, kick them back to home
  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ background: '#222', color: 'gold', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '30px' }}>
        <h2>👑 Administrator Dashboard</h2>
        <p>You have full control to Add and Delete marketplace items.</p>
      </div>

      {/* ADMIN ADD PRODUCT FORM */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Add New Item to Marketplace</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" name="name" placeholder="Product Name" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} style={inputStyle} />
            <input type="text" name="image_url" placeholder="Image URL" required value={productForm.image_url} onChange={e => setProductForm({...productForm, image_url: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="number" name="price" placeholder="Price" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} style={inputStyle} />
            <input type="number" name="quantity" placeholder="Quantity" required value={productForm.quantity} onChange={e => setProductForm({...productForm, quantity: e.target.value})} style={inputStyle} />
            <select name="category" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} style={inputStyle}>
              <option value="Clothing">Clothing</option>
              <option value="Decor">Decor</option>
              <option value="Pottery">Pottery</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>{isLoading ? 'Adding...' : 'Add Product'}</button>
        </form>
      </div>

      {/* ADMIN DELETE PRODUCTS LIST */}
      <h3>Manage Existing Items</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {allProducts.map(product => (
          <div key={product.id} style={{ border: '2px solid red', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{product.name}</p>
            <p style={{ margin: '0 0 10px 0' }}>{product.price} TND</p>
            <button onClick={() => handleDelete(product.id)} style={{ width: '100%', padding: '8px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Delete Item</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '8px', border: '1px solid #ccc', flex: 1 };
export default Admin;