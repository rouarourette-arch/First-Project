import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if it's already there
        return prevCart.map(item => 
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      // Add new item with a starting quantity of 1
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  // Calculate total items for the red bubble
  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}