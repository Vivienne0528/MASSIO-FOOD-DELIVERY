// "use client";

// import CheckoutForm from "@/components/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
// import { use, useEffect, useState } from "react";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const PayPage = ({ params }: { params: { id: string } }) => {
//   const [clientSecret, setClientSecret] = useState("");


//   const { id } = params;

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/create-intent/${id}`,
//           {
//             method: "POST",
//           }
//         );
//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     makeRequest();
//   }, [id]);

//   const options: StripeElementsOptions = {
//     clientSecret,
//     appearance: {
//       theme: "stripe"
//     }
//   }

//   return (
//     <div>
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default PayPage;
"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = () => {
  const { id } = useParams(); // ✅ 正确获取 id
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!id) return; // 确保 id 存在再请求

    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch payment intent");
        }

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PayPage;
