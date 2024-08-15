import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const accountId = parseInt(params.id);

 if (isNaN(accountId)) {
  return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
 }

 try {
  const account = await prisma.accountForSale.findUnique({
   where: {
    id: accountId
   }
  });

  if (!account) {
   return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  return NextResponse.json(account);
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

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const accountId = parseInt(params.id);

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

  const updatedAccount = await prisma.accountForSale.update({
   where: { id: accountId },
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

  return NextResponse.json(updatedAccount);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}

export async function DELETE(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const accountId = parseInt(params.id);

 try {
  const updatedAccount = await prisma.accountForSale.delete({
   where: { id: accountId }
  });

  return NextResponse.json(updatedAccount);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
