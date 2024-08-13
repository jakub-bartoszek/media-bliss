import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const accounts = await prisma.account.findMany({
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
   followsCount,
   genderType,
   genderPercentage,
   polishFollowersPercentage,
   age18to24Percentage
  } = await request.json();

  const newAccount = await prisma.account.create({
   data: {
    price,
    category,
    followsCount,
    genderType,
    genderPercentage,
    polishFollowersPercentage,
    age18to24Percentage
   }
  });

  return NextResponse.json(newAccount);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
