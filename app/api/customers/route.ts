import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const emailParam = new URL(request.url).searchParams.get("email");
 const email = emailParam;

 try {
  const customers = await prisma.customer.findMany({
   where: email ? { email } : {},
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
