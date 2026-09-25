import { getProducts } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/search";

export const metadata = {
  title: "The Everything Store",
  description: "A shopping destination for everything you need",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const products = await getProducts();
  const visibleProducts = tag
    ? products.filter((product) => product.tags?.includes(tag))
    : products;

  return (
    <main className="container mx-auto py-4">
      <Search products={products} />
      <h1 className="text-3xl font-bold font-heading mb-4 ml-2">Products</h1>
      <p className="text-sm font-body font-bold ml-2">
        Welcome to the products page. We have what you need WHEN you need it
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </main>
  );
}
