import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const customers = await prisma.customer.findMany({
   include: {
    orders: true
   }
  });

  return NextResponse.json(customers);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
