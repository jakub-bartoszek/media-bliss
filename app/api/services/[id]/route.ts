import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const packageId = parseInt(params.id);

 if (isNaN(packageId)) {
  return NextResponse.json({ error: "Invalid package ID" }, { status: 400 });
 }

 try {
  const response = await prisma.package.findUnique({
   where: {
    id: packageId
   }
  });

  if (!response) {
   return NextResponse.json({ error: "Package not found" }, { status: 404 });
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
 const packageId = parseInt(params.id);

 try {
  const { name, price, category, benefits } = await request.json();

  const response = await prisma.package.update({
   where: { id: packageId },
   data: {
    name,
    price,
    category,
    benefits
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
 const packageId = parseInt(params.id);

 try {
  const response = await prisma.package.delete({
   where: { id: packageId }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
