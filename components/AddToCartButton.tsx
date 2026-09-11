"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
    >
      Add to Cart
    </button>
  );
}
