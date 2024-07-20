import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ServiceCategory } from "@prisma/client";

export async function GET(request: Request) {
 const categoryParam = new URL(request.url).searchParams.get(
  "category"
 );
 const category = categoryParam as ServiceCategory | undefined;

 try {
  const services = await prisma.service.findMany({
   where: category ? { category } : {},
   orderBy: {
    price: "desc"
   }
  });

  return NextResponse.json(services);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function POST(request: NextRequest) {
 try {
  const { name, price, description, list, image, category, type } =
   await request.json();

  const newService = await prisma.service.create({
   data: {
    name,
    price,
    description,
    list,
    image,
    category,
    type
   }
  });

  return NextResponse.json(newService);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
