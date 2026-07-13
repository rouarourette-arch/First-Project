import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // NEW: State to track which items the user has "liked"
  const [likedItems, setLikedItems] = useState([]);
  
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

  // NEW: The Creative Pop Effect
  const handleLike = (e, productId) => {
    e.preventDefault(); // Prevents default button behavior
    
    // Toggle the heart state
    const isLiked = likedItems.includes(productId);
    if (isLiked) {
      setLikedItems(likedItems.filter(id => id !== productId));
    } else {
      setLikedItems([...likedItems, productId]);
      
      // Calculate exactly where the mouse clicked on the screen
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Fire a localized burst of confetti right at the cursor!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        colors: ['#ff4d4f', '#ff7875', '#A67B5B'], // Heart colors + your theme color
        scalar: 0.8, // Makes the particles slightly smaller for a clean look
        ticks: 100, // Makes them fade out nicely
        zIndex: 1000
      });
    }
  };

  const categories = ['All', 'Clothing', 'Decor', 'Pottery'];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Animated Hero Section */}
      <div style={{
        background: 'linear-gradient(-45deg, #A67B5B, #8B5A33, #d4a373, #faedcd)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        padding: '80px 20px',
        borderRadius: '24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '40px',
        boxShadow: '0 20px 40px -10px rgba(166, 123, 91, 0.4)'
      }}>
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 15px 0', textShadow: '2px 4px 8px rgba(0,0,0,0.2)', letterSpacing: '-1px' }}>
          Authentic Craftsmanship.
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Discover hand-crafted pottery, unique decor, and traditional clothing directly from our local artisans.
        </p>
      </div>

      {/* Horizontal Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ margin: 0, color: '#2C2A29', fontSize: '2rem' }}>Latest Arrivals</h2>
        
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 20px',
                borderRadius: '25px',
                border: 'none',
                background: selectedCategory === category ? '#2C2A29' : '#F9F8F6',
                color: selectedCategory === category ? '#fff' : '#757575',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === category ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#757575' }}>Loading marketplace...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredProducts.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#757575', padding: '40px 0' }}>
              No products found in this category.
            </p>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                
                {/* NEW: Interactive Heart Button floating over the image */}
                <button 
                  onClick={(e) => handleLike(e, product.id)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {likedItems.includes(product.id) ? '❤️' : '🤍'}
                </button>

                <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2C2A29', lineHeight: '1.3' }}>{product.name}</h3>
                    <span style={{ background: '#F9F8F6', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', color: '#757575', fontWeight: '500' }}>
                      {product.category}
                    </span>
                  </div>
                  
                  <p style={{ color: '#A67B5B', fontWeight: '700', fontSize: '1.4rem', margin: '10px 0 20px 0' }}>{product.price} TND</p>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      onClick={() => addToCart(product)} 
                      style={{ width: '100%', padding: '12px', background: '#2C2A29', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: '600' }}
                    >
                      Ajouter au Panier
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;