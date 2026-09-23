"use client";
import {
  ShoppingCart,
  MessageSquare,
  Sun,
  Home,
  Menu,
  Moon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import MenuModal from "./MenuModal";
import { useTheme } from "@/hooks/useTheme";

export default function IconMenu() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-row mx-auto mt-2 justify-center">
      <Link href="/">
        <div className="hidden md:flex group relative  mx-auto items-center mt-2 justify-center mr-2">
          <Home className="w-6 h-6 text-gray-800 dark:text-white mx-1" />
          <span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded
               bg-gray-800 px-2 py-1 text-xs text-white opacity-0 pointer-events-none
               transition-opacity group-hover:opacity-100"
          >
            Home
          </span>
        </div>
      </Link>
      <div className="flex mx-auto items-center mt-2 justify-center mr-2">
        <Link href="/cart">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800 dark:text-white mx-1" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
        </Link>
      </div>
      <Link href="/contact">
        <div className="hidden md:flex group relative mx-auto items-center mt-2 justify-center mr-2">
          <MessageSquare className="w-6 h-6 text-gray-800 dark:text-white mx-1" />
          <span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded
               bg-gray-800 px-2 py-1 text-xs text-white opacity-0 pointer-events-none
               transition-opacity group-hover:opacity-100"
          >
            Contact us
          </span>
        </div>
      </Link>
      <div className="group relative flex mx-auto items-center mt-2 justify-center mr-2">
        <Menu
          onClick={() => setIsMenuOpen(true)}
          className="w-6 h-6 text-gray-800 dark:text-white mx-1 md:hidden "
        />
        {isMenuOpen && <MenuModal onClose={() => setIsMenuOpen(false)} />}
        <span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded
               bg-gray-800 px-2 py-1 text-xs text-white opacity-0 pointer-events-none
               transition-opacity group-hover:opacity-100"
        >
          Toggle theme
        </span>
      </div>
      <div className="hidden md:flex group relative  mx-auto items-center mt-2 justify-center mr-2">
        {theme === "dark" ? (
          <Moon
            onClick={toggleTheme}
            className="w-6 h-6 text-gray-800 dark:text-white mx-1 cursor-pointer"
          />
        ) : (
          <Sun
            onClick={toggleTheme}
            className="w-6 h-6 text-gray-800 mx-1 cursor-pointer"
          />
        )}
        <span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded
               bg-gray-800 px-2 py-1 text-xs text-white opacity-0 pointer-events-none
               transition-opacity group-hover:opacity-100"
        >
          Toggle theme
        </span>
      </div>
    </div>
  );
}
