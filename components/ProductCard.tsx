import Image from "next/image";
import { Product } from "../types/product";
import { ShoppingCart, PlusCircleIcon, MinusCircleIcon } from "lucide-react";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
            <Image 
            src={product.image.url}
            alt={product.image.alt || product.title}
            width={300}
            height={200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading={priority ? "eager" : "lazy"}
            className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold mt-2">NOK{product.price}</p>
                <p className="text-amber-500 text-sm mt-1">Discounted Price NOK{product.discountedPrice}</p>
            
            </div>
            <div className="flex mt-auto mx-auto mb-0.5  text-blue-800">
            < PlusCircleIcon className="mx-2 inline-block w-5 h-5 text-blue-800 mt-1" />
            <form className="inline-block"> 
                <input type="number" min="1" defaultValue="1" className="w-16 text-center border-2 rounded-md text-gray-800" />
            </form>
            < MinusCircleIcon className="ml-2 mt-1 inline-block w-5 h-5 text-blue-800" />
            <ShoppingCart className="ml-2 inline-block w-7 h-7 " />
            </div>
        </div>
    );}