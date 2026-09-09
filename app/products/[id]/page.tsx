import { getProductById } from "@/utils/api";
//import { Review } from "@/types/product";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetail({ params}: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    const reviews = product.reviews;
    const tags = product.tags;
    const hasDiscount = product.discountedPrice !== product.price;
   
  
  return (
  <main className="flex flex-row mx-auto p-4">
    <div>
<Image src={product.image.url} alt={product.image.alt || product.title} width={300} height={200} className=" h-100 w-100 object-cover" />
</div>
<div className="p-4 flex-1 flex-col justify-center">
    <h2 className="text-lg font-regular text-gray-600 mb-2">{product.title}</h2>
    <p className="text-gray-800 text-lg font-semibold">{product.description}</p>
   
  

    <section className="mt-4 flex gap-2 align-items-center items-center">
   { hasDiscount ? (
    <>
    <p className="text-amber-500 text-medium font-semibold mt-1">Your Price NOK{product.discountedPrice}</p>
        <span className="text-gray-800 font-small font-light line-through">Price: NOK{product.price}</span>
        
    </>
   ) : (
    <span className="text-gray-800 font-medium">Price: NOK{product.price}</span>
   )}
    </section>

    {tags && tags.length > 0 && (
      <section className="mt-4 flex gap-2">
        <span className="text-gray-500 text-sm">Tags:</span>
        {tags.map((tag) => (
          <span key={tag} className="text-gray-800 font-medium">
            {tag}
          </span>
        ))}
      </section>
    )}

    {reviews && reviews.length > 0 && (
      <section className="mt-4">
        <h3 className="text-lg font-medium text-gray-800">Reviews</h3>
        <ul className="mt-2">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-500 text-sm">{review.rating} / 5</p>
              <p className="text-gray-800 font-medium">{review.username}</p>
              <p className="text-gray-600">{review.description}</p>
            </li>
          ))}
        </ul>
      </section>
    )}

    <AddToCartButton product={product} />
</div>
  </main>
  )
}