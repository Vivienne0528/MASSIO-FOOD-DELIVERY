// import { ProductType } from "@/types/types";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const getData = async (category: string) => {
//   const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
//     cache: "no-store"
//   })

//   if (!res.ok) {
//     throw new Error("Failed!");
//   }

//   return res.json()
// }

// type Props = {
//   params: { category: string }
// }

// const CategoryPage = async ({ params }: Props) => {

//   const products: ProductType[] = await getData(params.category)
//   return (
//     <div className="flex flex-wrap text-red-500">
//       {products.map((item) => (
//         <Link className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
//           {/* IMAGE CONTAINER */}
//           {item.img && (
//             <div className="relative h-[80%]">
//               <Image src={item.img} alt="" fill className="object-contain" />
//             </div>
//           )}
//           {/* TEXT CONTAINER */}
//           <div className="flex items-center justify-between font-bold">
//             <h1 className="text-2xl uppercase p-2">{item.title}</h1>
//             <h2 className="group-hover:hidden text-xl">${item.price}</h2>
//             <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">Add to Cart</button>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// This is the dynamic route file: app/menu/[category]/page.tsx
import { FC } from 'react';
import { ProductType } from "@/types/types";
import React from 'react';

// This is the function to generate static parameters for your dynamic route
export async function generateStaticParams() {
  // Return an array of categories that should be pre-rendered
  return [
    { category: 'pizza' },
    { category: 'burger' },
    // Add more categories as needed
  ];
}

// This is the main page component
const CategoryPage: FC<{ params: { category: string } }> = ({ params }) => {
  const { category } = params;

  const getData = async (category: string) => {
    const res = await fetch(`http://localhost:3000/api/products?cat=${category}`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  };

  const [products, setProducts] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    // Fetch the products based on the category
    getData(category).then(setProducts).catch(console.error);
  }, [category]);

  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>${item.price}</p>
          {/* Render your products here */}
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
