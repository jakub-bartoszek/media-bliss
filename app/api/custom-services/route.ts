import { prisma } from "@/lib/server/database/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const categoryParam = new URL(request.url).searchParams.get("category");
 const category = categoryParam as Category | undefined;

 try {
  const response = await prisma.customService.findMany({
   where: category ? { category } : {},
   orderBy: {
    pricePerUnit: "desc"
   }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function POST(request: NextRequest) {
 try {
  const { name, pricePerUnit, category } = await request.json();

  const response = await prisma.customService.create({
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
