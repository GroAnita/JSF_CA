"use client";
import Link from "next/link";
import { X, Sun, Moon } from "lucide-react";
import logo from "../public/logo.png";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export default function MenuModal({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="fixed inset-0 bg-gray-800/55 flex items-center justify-center z-15"
      onClick={onClose}
    >
      <div
        className="bg-green-100 p-4 rounded w-2/3 h-2/3 flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="flex justify-end">
          <X
            onClick={onClose}
            className="w-6 h-6 text-gray-200 cursor-pointer mb-4 bg-gray-500 rounded-full"
          />
        </span>
        <section>
          <h2 className="text-blue-800 text-2xl text-center font-bold mb-4 font-heading">
            Menu
          </h2>
          <ul>
            <li>
              <Link
                href="/"
                className="text-gray-800 hover:text-gray-600 font-body"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-gray-800 hover:text-gray-600 font-body"
                onClick={onClose}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-gray-600 font-body"
                onClick={onClose}
              >
                Contact us
              </Link>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 font-body"
              >
                {theme === "dark" ? (
                  <>
                    <Moon className="w-4 h-4" /> Dark mode
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" /> Light mode
                  </>
                )}
              </button>
            </li>
          </ul>
        </section>
        <section className="mt-auto">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h3 className="text-gray-800 text-lg font-semibold text-center ">
            The Everything Store
          </h3>
        </section>
      </div>
    </div>
  );
}
