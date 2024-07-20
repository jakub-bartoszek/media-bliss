import { prisma } from "@/lib/server/database/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
 req: Request,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params;
  const { name, price, description, list, category, type, image } =
   await req.json();

  if (!id) {
   console.error("[PATCH] Service ID missing");
   return new NextResponse("Service ID missing", { status: 400 });
  }

  const updatedService = await prisma.service.update({
   where: { id: parseInt(id, 10) },
   data: {
     name,
     price: parseInt(price, 10),
     description,
     list,
     category,
     type,
     image
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

export async function DELETE(
 req: Request,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params;

  if (!id) {
   console.error("[DELETE] Service ID missing");
   return new NextResponse("Service ID missing", { status: 400 });
  }

  const service = await prisma.service.delete({
   where: { id: parseInt(id, 10) }
  });

  return NextResponse.json(service);
 } catch (error) {
  console.error("[SERVICE_ID_DELETE]", error);
  return new NextResponse("Internal Error", { status: 500 });
 } finally {
  await prisma.$disconnect();
 }
}
