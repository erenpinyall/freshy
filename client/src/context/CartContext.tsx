import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem, Product } from "../types";
import { CartContext } from "./useCart";

// 🔥 SAFE LOCALSTORAGE PARSE (CRASH FIX)
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("app_cart");
    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // persist
  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(items));
  }, [items]);

  // ADD
  const addToCart = (product: Product, quantity = 1) => {
    if (!product?.id) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity }];
    });

    setIsCartOpen(true);
  };

  // REMOVE
  const removeFromCart = (productId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  // UPDATE
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // CLEAR
  const clearCart = () => {
    setItems([]);
    setIsCartOpen(false);
  };

  // TOTALS
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = items.reduce(
    (sum, item) =>
      sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
