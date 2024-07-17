// app/api/services/[id]/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
 req: Request,
 { params }: { params: any }
) {
 try {
  const { id } = params;
  if (!id) {
   return new NextResponse("Service ID missing", { status: 400 });
  }

  const service = await prisma.service.delete({
   where: {
    id: parseInt(id as string)
   }
  });

  return NextResponse.json(service);
 } catch (error) {
  console.error("[SERVICE_ID_DELETE]", error);
  return new NextResponse("Internal Error", { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}

export async function PATCH(
 req: Request,
 { params }: { params: any }
) {
 try {
  const { id } = params;
  const { name, price, description, list, image, category, type } =
   await req.json();

  if (!id) {
   return new NextResponse("Service ID missing", { status: 400 });
  }

  const updatedService = await prisma.service.update({
   where: { id: parseInt(id as string) },
   data: {
    name,
    price: parseInt(price),
    description,
    list,
    category,
    type
   }
  });

  return NextResponse.json(updatedService);
 } catch (error) {
  console.error("[SERVICE_ID_PATCH]", error);
  return new NextResponse("Internal Error", { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}
