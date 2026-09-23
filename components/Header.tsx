import { Titan_One } from "next/font/google";
import IconMenu from "@/components/IconMenu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const titan = Titan_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

export const metadata = {
  title: "The Everything Shop",
  description: "A shop for everything you need",
};

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gray-100 dark:bg-gray-800  py-4 flex items-center justify-between">
      <div className="container mx-auto flex flex-1 items-center justify-center"></div>
      <div
        className="
             flex flex-row items-center justify-start"
      >
        <Image
          src={logo}
          alt="Logo mascot"
          width={80}
          height={80}
          loading="eager"
        />
        <Link href="/">
          <h1
            className={` hidden md:block ${titan.className} text-xl tracking-wide ml-2
           text-gray-800 dark:text-white`}
          >
            <span className="text-4xl"> T</span>HE{" "}
            <span className="text-4xl"> E</span>VERYTHING{" "}
            <span className="text-4xl"> S</span>TORE
          </h1>
        </Link>
      </div>
      <div className="container mx-auto flex flex-1 items-center justify-end">
        <IconMenu />
      </div>
    </header>
  );
}
