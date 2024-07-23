import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const orders = await prisma.order.findMany();

  return NextResponse.json(orders);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
