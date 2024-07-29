import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/database/prisma";

export async function GET(request: NextRequest) {
 try {
  const orders = await prisma.order.findMany();

  const response = NextResponse.json(orders);
  response.headers.set(
   "Cache-Control",
   "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Expires", "0");
  response.headers.set("Pragma", "no-cache");

  return response;
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
