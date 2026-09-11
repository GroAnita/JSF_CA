"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart: (productId: string) => {
          setItems((prev) =>
            prev.filter((item) => item.product.id !== productId)
          );
        },
        updateQuantity: (productId: string, quantity: number) => {
          if (quantity < 1) return;
          setItems((prev) =>
            prev.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            )
          );
        },
      }}
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
