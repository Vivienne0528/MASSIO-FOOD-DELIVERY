"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiUrl } from "@/utils/url";

const CategoryPage = () => {
  const { category } = useParams(); // 获取 URL 参数
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products?cat=${category}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed!");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (category) fetchData();
  }, [category]);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;

