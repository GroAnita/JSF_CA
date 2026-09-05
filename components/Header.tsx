import Image from "next/image";

export default function Header() {
    return (
        <div>
            <header className="bg-gray-800 text-background py-4 flex items-center justify-between">
                <div className="container mx-auto flex flex-1 items-center justify-center">
                    <Image src="/globe.svg" alt="Logo" width={32} height={32} className="h-8 w-8 ml-2" />
                </div>    
                <div className="container mx-auto flex items-center justify-center">
                    <h1 className="text-2xl font-heading font-black ">The Everything shop</h1>
                </div>
                <div className="container mx-auto flex flex-1 items-center justify-end">
                </div>

            </header>
        </div>
    );
}