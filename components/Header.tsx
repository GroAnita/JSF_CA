
import { Titan_One } from "next/font/google";
import IconMenu from '@/components/IconMenu'

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
        <header className="bg-gray-100 text-background py-4 flex items-center justify-between">
            <div className="container mx-auto flex flex-1 items-center justify-center">
            </div>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className={` ${titan.className} text-xl tracking-wide
           text-gray-800`}>
  THE EVERYTHING STORE
</h1>
            </div>
            <div className="container mx-auto flex flex-1 items-center justify-end">
                <IconMenu />
            </div>
        </header>
    );
}