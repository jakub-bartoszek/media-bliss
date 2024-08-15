import { prisma } from "@/lib/server/database/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const categoryParam = new URL(request.url).searchParams.get("category");
 const category = categoryParam ? (categoryParam as Category) : undefined;

 try {
  const response = await prisma.customAccount.findMany({
   where: category ? { category } : {},
   orderBy: {
    pricePerFollow: "desc"
   }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error("Error fetching accounts:", error);
  return NextResponse.json(
   { error: "Error fetching accounts" },
   { status: 500 }
  );
 }
}
