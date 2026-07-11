import React from 'react';

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '450px', maxWidth: '90%' }}>
        <h2>{product.name}</h2>
        <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', margin: '15px 0', borderRadius: '4px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', color: '#8B4513', fontSize: '1.2rem' }}>{product.price} TND</span>
          <span style={{ background: '#eee', padding: '2px 8px', borderRadius: '12px', fontSize: '0.9rem' }}>{product.category}</span>
        </div>
        <p><strong>Available:</strong> {product.quantity} units</p>
        <p style={{ marginTop: '10px', lineHeight: '1.5' }}><strong>Description:</strong> {product.description}</p>
        
        <button 
          onClick={onClose} 
          style={{ marginTop: '20px', padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', width: '100%', borderRadius: '4px' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProductModal;