"use client";

import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const { id } = useParams(); // ✅ 正确获取动态参数
  const [singleProduct, setSingleProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setSingleProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!singleProduct) return <p>Loading...</p>;

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase">
          <span>{singleProduct.title}</span>
          <DeleteButton id={singleProduct.id} />
        </h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
    </div>
  );
};

export default SingleProductPage;
