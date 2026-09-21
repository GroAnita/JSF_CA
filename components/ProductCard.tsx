"use client";
import Image from "next/image";
import { Product } from "../types/product";
import { ShoppingCart, PlusCircleIcon, MinusCircleIcon } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const tags = product.tags;
  const hasDiscount = product.discountedPrice !== product.price;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          width={300}
          height={200}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={priority ? "eager" : "lazy"}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-medium font-semibold">{product.title}</h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>
        <section className="mt-1 flex flex-col gap-2 align-items-center items-center mx-auto">
          {hasDiscount ? (
            <>
              <p className="text-amber-500 text-medium font-semibold">
                Your Price NOK{product.discountedPrice}
              </p>
              <span className="text-gray-800 text-sm font-light line-through">
                Price: NOK{product.price}
              </span>
            </>
          ) : (
            <span className="text-gray-800 text-medium font-semibold">
              Price: NOK{product.price}
            </span>
          )}
        </section>
      </Link>
      <div className="flex flex-col mt-auto mx-auto mb-0.5  text-blue-800">
        <section>
          <PlusCircleIcon
            className="mx-2 inline-block w-5 h-5 text-blue-800 mt-1"
            onClick={() => setQuantity(quantity + 1)}
          />
          <form className="inline-block">
            <input
              type="number"
              min="1"
              className="w-16 text-center border-2 rounded-md text-gray-800 apperance-none"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </form>
          <MinusCircleIcon
            className="ml-2 mt-1 inline-block w-5 h-5 text-blue-800"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))} //to not let it go under 0
          />
        </section>
        <section className="mx-auto">
          <AddToCartButton product={product} quantity={quantity}>
            <ShoppingCart className="w-4 h-4 "></ShoppingCart>
          </AddToCartButton>
        </section>
      </div>
      {tags && tags.length > 0 && (
        <section className="mt-4 flex gap-2 mx-auto">
          <span className="text-gray-500 text-xs">Tags:</span>
          {tags.map((tag) => (
            <span key={tag} className="text-gray-800 text-xs">
              {tag}
            </span>
          ))}
        </section>
      )}
    </div>
  );
}
