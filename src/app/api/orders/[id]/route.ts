import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (req: NextRequest) => {
  try {
    // 解析 URL，获取 ID
    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop(); // 获取路径中的 ID

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Missing order ID!" }),
        { status: 400 }
      );
    }

    const body = await req.json(); // 解析请求体

    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid request body!" }),
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id },
      data: { status: body.status }, // 确保 `body.status` 存在
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Order Update Error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
