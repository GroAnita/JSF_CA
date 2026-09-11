"use client";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

export default function Search({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const matchedProducts =
    query.trim().length > 0
      ? products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="container mx-auto relative py-8">
      <form className="mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        {matchedProducts.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded mt-1 shadow-md flex flex-col">
            {matchedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuery("")}
              >
                {product.image && (
                  <Image
                    src={product.image.url}
                    alt={product.title}
                    width={32}
                    height={32}
                    className="inline-block w-8 h-8 mr-2 object-cover border-2 border-gray-300"
                  />
                )}
                {product.title}
              </Link>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
