import { prisma } from "@/lib/server/database/prisma";
import { Category } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const categoryParam = new URL(request.url).searchParams.get("category");
 const category = categoryParam as Category | undefined;

 try {
  const accounts = await prisma.accountForSale.findMany({
   where: category ? { category } : {},
   orderBy: {
    price: "desc"
   }
  });

  return NextResponse.json(accounts);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function POST(request: NextRequest) {
 try {
  const {
   price,
   category,
   followerCount,
   predominantGender,
   genderPercentage,
   polishPercentage,
   age18To24Percentage
  } = await request.json();

  const newAccount = await prisma.accountForSale.create({
   data: {
    price,
    category,
    followerCount,
    predominantGender,
    genderPercentage,
    polishPercentage,
    age18To24Percentage
   }
  });

  return NextResponse.json(newAccount);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
