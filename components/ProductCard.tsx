import Image from "next/image";
import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image 
            src={product.image.url}
            alt={product.image.alt || product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold mt-2">${product.price}</p>
            </div>
        </div>
    );}