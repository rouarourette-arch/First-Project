import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const API_PRODUCTS = 'https://6a50f1e6c576c846dcba0844.mockapi.io/Products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_PRODUCTS);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* WOW FEATURE: Animated Hero Section */}
      <div style={{
        background: 'linear-gradient(-45deg, #A67B5B, #8B5A33, #d4a373, #faedcd)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        padding: '80px 20px',
        borderRadius: '24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '50px',
        boxShadow: '0 20px 40px -10px rgba(166, 123, 91, 0.4)'
      }}>
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 15px 0', textShadow: '2px 4px 8px rgba(0,0,0,0.2)', letterSpacing: '-1px' }}>
          Authentic Craftsmanship.
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Discover hand-crafted pottery, unique decor, and traditional clothing directly from our local artisans.
        </p>
      </div>

      <h2 style={{ marginBottom: '25px', color: '#2C2A29', fontSize: '2rem' }}>Latest Arrivals</h2>

      {isLoading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#757575' }}>Loading marketplace...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map(product => (
            <div key={product.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
              <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2C2A29', lineHeight: '1.3' }}>{product.name}</h3>
                  <span style={{ background: '#F9F8F6', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', color: '#757575', fontWeight: '500' }}>
                    {product.category}
                  </span>
                </div>
                
                <p style={{ color: '#A67B5B', fontWeight: '700', fontSize: '1.4rem', margin: '10px 0 20px 0' }}>{product.price} TND</p>
                
                {/* Pushes the button to the bottom of the card smoothly */}
                <div style={{ marginTop: 'auto' }}>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      // Minimal, clean notification instead of an ugly alert
                      console.log(`${product.name} added`);
                    }} 
                    style={{ width: '100%', padding: '12px', background: '#2C2A29', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: '600' }}
                  >
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;