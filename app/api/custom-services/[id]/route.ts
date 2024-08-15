import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customServiceId = parseInt(params.id);

 if (isNaN(customServiceId)) {
  return NextResponse.json(
   { error: "Invalid custom service ID" },
   { status: 400 }
  );
 }

 try {
  const response = await prisma.customService.findUnique({
   where: {
    id: customServiceId
   }
  });

  if (!response) {
   return NextResponse.json(
    { error: "Custom service not found" },
    { status: 404 }
   );
  }

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customServiceId = parseInt(params.id);

 try {
  const { name, pricePerUnit, category } = await request.json();

  const response = await prisma.customService.update({
   where: { id: customServiceId },
   data: {
    name,
    pricePerUnit,
    category
   }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customServiceId = parseInt(params.id);

 try {
  const response = await prisma.customService.delete({
   where: { id: customServiceId }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
