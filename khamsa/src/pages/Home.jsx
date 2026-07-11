import React, { useState, useEffect } from 'react';
import ProductCard from '../components/Home/ProductCard';
import ProductModal from '../components/Home/ProductModal';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Clothing', 'Decor', 'Pottery'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://6a50f1e6c576c846dcba0844.mockapi.io/Products');
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => Number(p.price) <= maxPrice);

    setFilteredProducts(result);
  }, [selectedCategory, maxPrice, products]);

  if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Marketplace...</h2></div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}><h2>Error: {error}</h2></div>;

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px', minHeight: '80vh' }}>
      
      <aside style={{ width: '250px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', height: 'fit-content' }}>
        <h3>Filters</h3>
        <div style={{ marginBottom: '20px' }}>
          <h4>Categories</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map(cat => (
              <li key={cat} style={{ marginBottom: '10px' }}>
                <label style={{ cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat} 
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ marginRight: '8px' }}
                  />
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Max Price: {maxPrice} TND</h4>
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </aside>

      <main style={{ flex: 1 }}>
        <h2>Marketplace</h2>
        {filteredProducts.length === 0 ? (
          <p>No products match your current filters.</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(prod) => setSelectedProduct(prod)} 
              />
            ))}
          </div>
        )}
      </main>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

    </div>
  );
}

export default Home;