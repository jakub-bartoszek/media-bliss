import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const orderId = parseInt(params.id);

 if (isNaN(orderId)) {
  return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
 }

 try {
  const order = await prisma.order.findUnique({
   where: {
    id: orderId
   }
  });

  if (!order) {
   return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const orderId = parseInt(params.id);

 try {
  const { email, status } = await request.json();

  const updatedOrder = await prisma.order.update({
   where: { id: orderId },
   data: {
    email,
    status
   }
  });

  return NextResponse.json(updatedOrder);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const orderId = parseInt(params.id);

 try {
  const updatedOrder = await prisma.order.delete({
   where: { id: orderId }
  });

  return NextResponse.json(updatedOrder);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
