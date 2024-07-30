import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const emailParam = new URL(request.url).searchParams.get("status");
 const email = emailParam;

 try {
  const orders = await prisma.order.findMany({
   where: email ? { email } : {}
  });
  return NextResponse.json(orders);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
