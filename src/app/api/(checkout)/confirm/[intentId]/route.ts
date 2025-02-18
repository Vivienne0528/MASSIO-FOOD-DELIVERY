import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    // ✅ 手动解析 intentId
    const urlParts = request.nextUrl.pathname.split("/");
    const intentId = urlParts[urlParts.length - 1];

    if (!intentId) {
      return new NextResponse(JSON.stringify({ message: "Missing intentId" }), {
        status: 400,
      });
    }

    await prisma.order.update({
      where: { intent_id: intentId },
      data: { status: "Being prepared!" },
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
