import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  // We grab the cart data and functions from our global Context
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  // If the cart is empty, show a friendly message instead of an empty page
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your Panier is Empty</h2>
        <Link to="/" style={{ color: '#8B4513', textDecoration: 'underline' }}>Go back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      
      {/* The list of items in the cart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
            
            {/* Image and Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#8B4513', fontWeight: 'bold' }}>{item.price} TND</p>
              </div>
            </div>

            {/* Quantity Controls and Remove Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', padding: '5px 10px', borderRadius: '4px' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={btnStyle}>-</button>
                <span style={{ fontWeight: 'bold' }}>{item.cartQuantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={btnStyle}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Total Price Section */}
      <div style={{ marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'right' }}>
        <h3>Total: <span style={{ color: '#8B4513' }}>{totalPrice.toFixed(2)} TND</span></h3>
        <button style={{ padding: '12px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }} onClick={() => alert("Checkout flow coming soon!")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

// Reusable button style for the + and - buttons
const btnStyle = { background: '#ddd', border: 'none', width: '25px', height: '25px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' };

export default Cart;