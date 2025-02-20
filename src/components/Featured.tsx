"use client";

import { ProductType } from "@/types/types";
import { apiUrl } from "@/utils/url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to fetch data!");
        }
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => router.push(`/product/${item.id}`)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
