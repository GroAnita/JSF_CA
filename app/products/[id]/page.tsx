import { getProductById, getProducts } from "@/utils/api";
//import { Review } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
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

  const allProducts = await getProducts();
  /** Shows any products related to the current product by using the shared tags */
  const relatedProducts = allProducts
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        candidate.tags?.some((tag) => tags?.includes(tag))
    )
    .slice(0, 4);

  return (
    <main className="flex flex-col mx-auto p-4 w-2/3 text-background">
      <Link href="/">
        <p className="text-gray-600 dark:text-blue-200 text-sm font-semibold">
          Back to products
        </p>
      </Link>
      <section className="flex flex-col md:flex-row mx-auto p-4">
        <div className="relative">
          <ProductImage
            url={product.image.url}
            alt={product.image.alt || product.title}
          />
          {hasDiscount && (
            <span className="absolute top-3 left-1 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded rotate-45">
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
          <h2 className="text-lg font-regular text-gray-600 dark:text-gray-100 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-lg font-semibold">
            {product.description}
          </p>

          <section className="mt-4 flex flex-col gap-2 align-items-center items-center">
            {hasDiscount ? (
              <>
                <p className="text-amber-500 text-medium font-semibold mt-1">
                  Your Price NOK{product.discountedPrice}
                </p>
                <span className="text-gray-800 dark:text-gray-100 font-small font-light line-through">
                  Price: NOK{product.price}
                </span>
              </>
            ) : (
              <span className="text-gray-800 dark:text-gray-100 font-medium">
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
        <hr className="mt-4 border-blue-800 dark:border-blue-200" />
        {reviews && reviews.length > 0 && (
          <section className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Reviews
            </h3>
            <ul className="mt-2">
              {reviews.map((review) => (
                <li key={review.id} className="border-b border-gray-200 py-2">
                  <p className="text-amber-500 font-semibold text-sm">
                    {review.rating} / 5
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {review.username}
                  </p>
                  <p className="text-gray-600 dark:text-white">
                    {review.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {/** Shows any products related to the current product by using the shared
      tags */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <hr className="mb-4 border-blue-800 dark:border-blue-200" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            You might also like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
