"use client";
import Image from "next/image";
import { Product } from "../types/product";
import { ShoppingCart, PlusCircleIcon, MinusCircleIcon } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import TagBadge from "./tagBadge";

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
  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            width={300}
            height={200}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={priority ? "eager" : "lazy"}
            className="w-full h-48 object-cover"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-1 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded rotate-45">
              -{discountPercentage}%
            </span>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-medium font-semibold">{product.title}</h2>
          <p className="text-gray-600 text-sm line-clamp-1">
            {product.description}
          </p>
        </div>
        <section className="mt-1 flex flex-col gap-2 align-items-center items-center mx-auto">
          {hasDiscount ? (
            <>
              <p className="text-amber-600 text-medium font-semibold">
                Your Price {product.discountedPrice}kr
              </p>
              <span className="text-gray-800 text-sm font-light line-through">
                {product.price}kr
              </span>
            </>
          ) : (
            <span className="text-gray-800 text-medium font-semibold">
              {product.price}kr
            </span>
          )}
        </section>
      </Link>
      <div className="flex flex-col mt-auto mx-auto items-center mb-0.5  text-blue-800">
        <section className="flex items-center justify-center gap-2">
          <PlusCircleIcon
            className="mx-2 inline-block w-6 h-6 text-blue-800 mt-1"
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
            className="ml-2 mt-1 inline-block w-6 h-6 text-blue-800"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))} //to not let it go under 0
          />
        </section>
        <section className="mx-auto">
          <AddToCartButton
            product={product}
            quantity={quantity}
            className="w-32"
          >
            <ShoppingCart className="w-6 h-6 mx-auto"></ShoppingCart>
          </AddToCartButton>
        </section>
      </div>

      {tags && tags.length > 0 && (
        <section className="p-1 flex gap-2 mx-auto">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </section>
      )}
    </div>
  );
}
