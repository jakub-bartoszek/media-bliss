import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customerId = parseInt(params.id);

 if (isNaN(customerId)) {
  return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
 }

 try {
  const customer = await prisma.customer.findUnique({
   where: {
    id: customerId
   }
  });

  if (!customer) {
   return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(customer);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customerId = parseInt(params.id);

 try {
  const { email, name } = await request.json();

  const updatedCustomer = await prisma.customer.update({
   where: { id: customerId },
   data: {
    email,
    name
   }
  });

  return NextResponse.json(updatedCustomer);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customerId = parseInt(params.id);

 try {
  const updatedCustomer = await prisma.customer.delete({
   where: { id: customerId }
  });

  return NextResponse.json(updatedCustomer);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
