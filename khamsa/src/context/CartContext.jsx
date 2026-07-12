import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  // NEW: Update quantity of a specific item
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => 
      prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.cartQuantity + amount;
          return { ...item, cartQuantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // NEW: Remove item entirely
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);
  
  // NEW: Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) * item.cartQuantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}