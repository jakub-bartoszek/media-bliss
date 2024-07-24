import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customerId = parseInt(params.id);

 if (isNaN(customerId)) {
  return NextResponse.json(
   { error: "Invalid customer ID" },
   { status: 400 }
  );
 }

 try {
  const customer = await prisma.customer.findUnique({
   where: { id: customerId },
   include: { orders: true }
  });

  if (!customer) {
   return NextResponse.json(
    { error: "Customer not found" },
    { status: 404 }
   );
  }

  return NextResponse.json(customer);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
