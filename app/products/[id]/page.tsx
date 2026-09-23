import { getProductById } from "@/utils/api";
//import { Review } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import TagBadge from "@/components/tagBadge";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  const reviews = product.reviews;
  const tags = product.tags;
  const hasDiscount = product.discountedPrice !== product.price;
  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <main className="flex flex-col mx-auto p-4 w-2/3">
      <Link href="/">
        <p className="text-gray-800 text-sm font-semibold">Back to products</p>
      </Link>
      <section className="flex flex-col md:flex-row mx-auto p-4">
        <div className="relative">
          <ProductImage
            url={product.image.url}
            alt={product.image.alt || product.title}
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
          {tags && tags.length > 0 && (
            <section className="mt-4 flex gap-2">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </section>
          )}
        </div>
        <div className="p-4 flex-1 flex-col mx-auto">
          <h2 className="text-lg font-regular text-gray-600 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-800 text-lg font-semibold">
            {product.description}
          </p>

          <section className="mt-4 flex flex-col gap-2 align-items-center items-center">
            {hasDiscount ? (
              <>
                <p className="text-amber-500 text-medium font-semibold mt-1">
                  Your Price NOK{product.discountedPrice}
                </p>
                <span className="text-gray-800 font-small font-light line-through">
                  Price: NOK{product.price}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-medium">
                Price: NOK{product.price}
              </span>
            )}
          </section>

          <section className="flex justify-center md:justify-start">
            <AddToCartButton product={product} />
          </section>
        </div>
      </section>

      <div className="mt-4">
        <hr className="mt-4 border-blue-800" />
        {reviews && reviews.length > 0 && (
          <section className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Reviews</h3>
            <ul className="mt-2">
              {reviews.map((review) => (
                <li key={review.id} className="border-b border-gray-200 py-2">
                  <p className="text-amber-500 font-semibold text-sm">
                    {review.rating} / 5
                  </p>
                  <p className="text-gray-800 font-medium">{review.username}</p>
                  <p className="text-gray-600">{review.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
