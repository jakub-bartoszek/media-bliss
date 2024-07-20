import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

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
