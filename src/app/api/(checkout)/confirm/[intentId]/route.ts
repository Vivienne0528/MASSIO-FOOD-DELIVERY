// import { prisma } from "@/utils/connect";
// import { NextResponse } from "next/server";

// export const PUT = async ({ params }: { params: { intentId: string } }) => {
//   const { intentId } = params;

//   try {
//     await prisma.order.update({
//       where: {
//         intent_id: intentId,
//       },
//       data: { status: "Being prepared!" },
//     });
//     return new NextResponse(
//       JSON.stringify({ message: "Order has been updated" }),
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const { intentId } = request.params; // Access params from NextRequest

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
