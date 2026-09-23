import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <header className="bg-blue-900 text-white py-4 flex flex-col items-center justify-between">
        <div className="container mx-auto flex flex-1 items-center justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={96}
            height={96}
            className="h-24 w-24 ml-2"
          />
        </div>
        <div className="container mx-auto mt-4 flex items-center justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="container flex flex-1 items-center justify-center mt-4">
          <p className="text-sm">
            &copy; 2026 The Everything store. All rights reserved.
          </p>
        </div>
      </header>
    </div>
  );
}
