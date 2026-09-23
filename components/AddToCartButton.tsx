"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  children,
}: {
  product: Product;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product, quantity)}
      className={`mt-4 px-4 py-1 bg-blue-600 text-white rounded ${className}`}
    >
      {children ?? "Add to Cart"}
    </button>
  );
}
