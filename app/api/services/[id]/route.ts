import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const serviceId = parseInt(params.id);

 if (isNaN(serviceId)) {
  return NextResponse.json(
   { error: "Invalid service ID" },
   { status: 400 }
  );
 }

 try {
  const service = await prisma.service.findUnique({
   where: {
    id: serviceId
   }
  });

  if (!service) {
   return NextResponse.json(
    { error: "Service not found" },
    { status: 404 }
   );
  }

  return NextResponse.json(service);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function POST(request: NextRequest) {
 try {
  const {
   name,
   price,
   description,
   list,
   image,
   category,
   type,
   requireLink
  } = await request.json();

  const newService = await prisma.service.create({
   data: {
    name,
    price,
    description,
    list,
    image,
    category,
    type,
    requireLink
   }
  });

  return NextResponse.json(newService);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const serviceId = parseInt(params.id);

 try {
  const {
   name,
   price,
   description,
   list,
   image,
   category,
   type,
   requireLink
  } = await request.json();

  const updatedService = await prisma.service.update({
   where: { id: serviceId },
   data: {
    name,
    price,
    description,
    list,
    image,
    category,
    type,
    requireLink
   }
  });

  return NextResponse.json(updatedService);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const serviceId = parseInt(params.id);

 try {
  const updatedService = await prisma.service.delete({
   where: { id: serviceId }
  });

  return NextResponse.json(updatedService);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
