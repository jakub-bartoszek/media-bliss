import { prisma } from "@/lib/server/database/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const categoryParam = new URL(request.url).searchParams.get("category");
 const category = categoryParam as Category | undefined;

 try {
  const response = await prisma.package.findMany({
   where: category ? { category } : {},
   orderBy: {
    price: "desc"
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
  const { name, price, category, benefits, requireLink } = await request.json();

  const response = await prisma.package.create({
   data: {
    name,
    price,
    category,
    benefits,
    requireLink
   }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
