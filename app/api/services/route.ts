import { prisma } from "@/lib/server/database/prisma";
import { ServiceCategory } from "@prisma/client";
import { NextResponse } from "next/server";

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
