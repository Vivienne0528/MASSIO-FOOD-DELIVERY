// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect } from "react";
// import Confetti from "react-confetti";

// const SuccessPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const payment_intent = searchParams.get("payment_intent");

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
//           method: "PUT",
//         });
//         setTimeout(() => {
//           router.push("/orders");
//         }, 5000);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     makeRequest();
//   }, [payment_intent, router]);

//   return (
//     <>
//       <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
//         <p className="max-w-[600px]">
//           Payment successful. You are being redirected to the orders page.
//           Please do not close the page.
//         </p>
//         <Confetti className="absolute m-auto"
//         />
//       </div>
//     </>
//   );
// };

// export default SuccessPage;
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent router={router} />
    </Suspense>
  );
};

const SuccessContent = ({ router }: { router: ReturnType<typeof useRouter> }) => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`https://massio-food-delivery.vercel.app/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    if (payment_intent) {
      makeRequest();
    }
  }, [payment_intent, router]);

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
      <p className="max-w-[600px]">
        Payment successful. You are being redirected to the orders page.
        Please do not close the page.
      </p>
      <Confetti className="absolute m-auto" />
    </div>
  );
};

export default SuccessPage;

