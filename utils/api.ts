import { Product } from "@/types/product";

type ApiResponse<T> = {
  data: T;
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} `);
  }

  const json: ApiResponse<Product[]> = await response.json();
  return json.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product with id ${id}: ${response.status}`
    );
  }

  const json: ApiResponse<Product> = await response.json();
  return json.data;
}
