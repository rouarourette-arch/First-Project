import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initialize state from localStorage if it exists
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('khamsa_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Automatically save the cart to localStorage every time it changes!
  useEffect(() => {
    localStorage.setItem('khamsa_cart', JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // 3. Add a clearCart function for when they checkout
  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) * item.cartQuantity), 0);

  // 4. Export clearCart
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}