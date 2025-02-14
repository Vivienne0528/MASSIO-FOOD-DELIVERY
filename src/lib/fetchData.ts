// src/lib/fetchData.ts

export async function fetchData(category: string) {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
