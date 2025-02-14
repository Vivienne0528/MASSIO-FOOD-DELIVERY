// import { getAuthSession } from "@/utils/auth";
// import { prisma } from "@/utils/connect";
// import { NextRequest, NextResponse } from "next/server";

// // GET SINGLE PRODUCT
// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;

//   try {
//     const product = await prisma.product.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     return new NextResponse(JSON.stringify(product), { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };

// // DELETE SINGLE PRODUCT
// export const DELETE = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   const session = await getAuthSession();

//   if (session?.user.isAdmin) {
//     try {
//       await prisma.product.delete({
//         where: {
//           id: id,
//         },
//       });

//       return new NextResponse(JSON.stringify("Product has been deleted!"), {
//         status: 200,
//       });
//     } catch (err) {
//       console.log(err);
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }),
//         { status: 500 }
//       );
//     }
//   }
//   return new NextResponse(JSON.stringify({ message: "You are not allowed!" }), {
//     status: 403,
//   });
// };
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// 获取产品 ID
const getProductIdFromRequest = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  return pathname.split("/").pop(); // 获取路径中的 ID
};

// GET SINGLE PRODUCT
export const GET = async (req: NextRequest) => {
  const id = getProductIdFromRequest(req);

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Missing product ID!" }),
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found!" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.error("GET Product Error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE SINGLE PRODUCT
export const DELETE = async (req: NextRequest) => {
  const id = getProductIdFromRequest(req);
  const session = await getAuthSession();

  if (!session?.user?.isAdmin) {
    return new NextResponse(
      JSON.stringify({ message: "You are not allowed!" }),
      { status: 403 }
    );
  }

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Missing product ID!" }),
      { status: 400 }
    );
  }

  try {
    await prisma.product.delete({ where: { id } });

    return new NextResponse(
      JSON.stringify({ message: "Product has been deleted!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Product Error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
