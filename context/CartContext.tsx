"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function saveCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  function addToCart(product: Product, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const next = existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { product, quantity }];
      saveCart(next);
      return next;
    });
  }

  function removeFromCart(productId: string) {
    setItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      saveCart(next);
      return next;
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    setItems((prev) => {
      const next = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCart(next);
      return next;
    });
  }

  function clearCart() {
    setItems([]);
    saveCart([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
