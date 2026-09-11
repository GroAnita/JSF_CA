import { getProducts } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/search";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto py-8">
      <Search products={products} />
      <h1 className="text-3xl font-bold font-heading mb-4 ml-2">Products</h1>
      <p className="text-sm font-body font-bold ml-2">
        Welcome to the products page. We have what you need WHEN you need it
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {products.map((product, index) => (
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
