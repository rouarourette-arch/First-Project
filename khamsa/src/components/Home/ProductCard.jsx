import React from 'react';
import { useCart } from '../../context/CartContext'; // 1. Import useCart

function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart(); // 2. Extract the function

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product); // 3. Add the product to the global state
    alert(`${product.name} added to cart!`); 
  };

  return (
    <div className="product-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#fff' }}>
      <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
      <p style={{ color: '#8B4513', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} TND</p>
      <p style={{ fontSize: '12px', color: '#666' }}>Category: {product.category} | Qty: {product.quantity}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button 
          onClick={() => onViewDetails(product)}
          style={{ flex: 1, padding: '8px', background: '#eee', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          View Details
        </button>
        <button 
          onClick={handleAddToCart}
          style={{ flex: 1, padding: '8px', background: '#8B4513', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Ajouter au Panier
        </button>
      </div>
    </div>
  );
}

export default ProductCard;