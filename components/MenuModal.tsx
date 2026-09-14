import Link from "next/link";
import { X } from "lucide-react";

export default function MenuModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-55 flex items-center justify-center z-15"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded w-2/3 h-2/3"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="flex justify-end">
          <X
            onClick={onClose}
            className="w-6 h-6 text-gray-200 cursor-pointer mb-4 bg-gray-500 rounded-full"
          />
        </span>
        <h2 className="text-blue-800 text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li>
            <Link
              href="/"
              className="text-gray-800 hover:text-gray-600"
              onClick={onClose}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="text-gray-800 hover:text-gray-600"
              onClick={onClose}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-gray-600"
              onClick={onClose}
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
