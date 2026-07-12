import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      
      // FIRE THE CONFETTI!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#A67B5B', '#8B5A33', '#FFD700', '#4CAF50']
      });

      // A small delay before the alert so they see the confetti first
      setTimeout(() => {
        alert("🎉 Purchase Successful! Thank you for shopping with Khamsa.");
      }, 300);
      
    }, 1500); 
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '2rem', color: '#2C2A29', marginBottom: '20px' }}>Your Panier is Empty</h2>
        <Link to="/" style={{ color: 'white', background: '#A67B5B', padding: '12px 24px', borderRadius: '25px', textDecoration: 'none', fontWeight: '500', boxShadow: 'var(--shadow-sm)' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', color: '#2C2A29', borderBottom: '2px solid #E0E0E0', paddingBottom: '15px' }}>Shopping Cart</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '25px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', border: '1px solid #E0E0E0', borderRadius: '16px', background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#2C2A29' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#A67B5B', fontWeight: '700', fontSize: '1.1rem' }}>{item.price} TND</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#F9F8F6', padding: '6px 12px', borderRadius: '10px', border: '1px solid #E0E0E0' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={btnStyle}>-</button>
                <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.cartQuantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={btnStyle}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>
                Remove
              </button>
            </div>

          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '30px', background: '#fff', borderRadius: '16px', textAlign: 'right', border: '1px solid #E0E0E0', boxShadow: 'var(--shadow-md)' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.6rem', color: '#2C2A29' }}>
          Total: <span style={{ color: '#A67B5B', fontWeight: '700' }}>{totalPrice.toFixed(2)} TND</span>
        </h3>
        
        <button 
          onClick={handleCheckout} 
          disabled={isCheckingOut}
          style={{ padding: '16px 32px', background: isCheckingOut ? '#ccc' : '#2C2A29', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', cursor: isCheckingOut ? 'not-allowed' : 'pointer', fontWeight: '600', width: '100%', maxWidth: '300px' }}
        >
          {isCheckingOut ? 'Processing Payment...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}

const btnStyle = { background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', fontWeight: 'bold', color: '#2C2A29', display: 'flex', alignItems: 'center', justifyContent: 'center' };

export default Cart;