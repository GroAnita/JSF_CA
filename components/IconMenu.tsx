"use client";
import { ShoppingCart, CircleUserRound, Sun, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function IconMenu() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-row mx-auto mt-2 justify-center">
      <div className="flex mx-auto items-center mt-2 justify-center mr-2">
        <Home className="w-6 h-6 text-gray-800 mx-1" />
      </div>
      <div className="flex mx-auto items-center mt-2 justify-center mr-2">
        <Link href="/cart">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800 mx-1" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
        </Link>
      </div>
      <div className="flex mx-auto items-center mt-2 justify-center mr-2 ">
        <CircleUserRound className="w-6 h-6 text-gray-800 mx-1 " />
      </div>
      <div className="flex mx-auto items-center mt-2 justify-center mr-2">
        <Sun className="w-6 h-6 text-gray-800 mx-1" />
      </div>
    </div>
  );
}
