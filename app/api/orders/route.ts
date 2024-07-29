import { prisma } from "@/lib/server/database/prisma";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const statusParam = new URL(request.url).searchParams.get("status");
 const status = statusParam as OrderStatus | undefined;

 try {
  const orders = await prisma.order.findMany({
   where: status ? { status } : {}
  });

  return NextResponse.json(orders);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
