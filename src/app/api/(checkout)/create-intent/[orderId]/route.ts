// src/app/api/(checkout)/create-intent/[orderId]/route.ts
// import { prisma } from "@/utils/connect";
// import { NextRequest, NextResponse } from "next/server";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { orderId: string } }
// ) {
//   const { orderId } = await params;
//   const order = await prisma.order.findUnique({
//     where: {
//       id: orderId,
//     },
//   });

//   if (order) {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: order.price * 100,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     await prisma.order.update({
//       where: {
//         id: orderId,
//       },
//       data: { intent_id: paymentIntent.id },
//     });

//     return new NextResponse(
//       JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       { status: 200 }
//     );
//   }
//   return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
//     status: 404,
//   });
// }
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    // 从 URL 解析 orderId
    const { pathname } = request.nextUrl;
    const orderId = pathname.split("/").pop(); // 取 URL 最后的部分

    if (!orderId) {
      return NextResponse.json(
        { message: "Missing orderId in request" },
        { status: 400 }
      );
    }

    // 获取订单数据
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found!" },
        { status: 404 }
      );
    }

    // ✅ 确保 order.price 是有效的数字
    if (!order.price || isNaN(Number(order.price))) {
      return NextResponse.json(
        { message: "Invalid order price!" },
        { status: 400 }
      );
    }

    const amount = Math.round(Number(order.price) * 100); // 转换为整数（cents）

    // 创建支付意图
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // 以 cents 为单位
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // 更新数据库中的 intent_id
    await prisma.order.update({
      where: { id: orderId },
      data: { intent_id: paymentIntent.id },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment Intent Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
