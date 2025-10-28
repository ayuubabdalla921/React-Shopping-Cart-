import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
            : item
        );
      }
      return [...current, { product, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const nextQuantity = Math.max(1, Math.min(quantity, 99));
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + item.quantity * item.product.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal
    }),
    [items, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
