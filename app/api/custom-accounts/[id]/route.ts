import { prisma } from "@/lib/server/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 const customAccountId = parseInt(params.id);

 try {
  const { pricePerFollow } = await request.json();

  const response = await prisma.customAccount.update({
   where: { id: customAccountId },
   data: {
    pricePerFollow
   }
  });

  return NextResponse.json(response);
 } catch (error) {
  console.error(error);
  return NextResponse.error();
 }
}
