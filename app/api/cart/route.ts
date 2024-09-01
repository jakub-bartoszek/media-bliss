import { CartItem } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();
  const { cartItems } = body;

  if (!cartItems || !Array.isArray(cartItems)) {
   throw new Error("Invalid cart items structure");
  }

  const packageIds = cartItems
   .filter((item: CartItem) => item.id.startsWith("package-"))
   .map((item: CartItem) => parseInt(item.id.split("-")[2]));

  const serviceIds = cartItems
   .filter((item: CartItem) => item.id.startsWith("service-"))
   .map((item: CartItem) => parseInt(item.id.split("-")[2]));

  const customServiceIds = cartItems
   .filter((item: CartItem) => item.id.startsWith("customService-"))
   .map((item: CartItem) => parseInt(item.id.split("-")[2]));

  const accountIds = cartItems
   .filter((item: CartItem) => item.id.startsWith("account-"))
   .map((item: CartItem) => parseInt(item.id.split("-")[2]));

  const customAccountIds = cartItems
   .filter((item: CartItem) => item.id.startsWith("customAccount-"))
   .map((item: CartItem) => parseInt(item.id.split("-")[2]));

  const validPackages = await prisma.package.findMany({
   where: { id: { in: packageIds } }
  });

  const validServices = await prisma.service.findMany({
   where: { id: { in: serviceIds } }
  });

  const validCustomServices = await prisma.customService.findMany({
   where: { id: { in: customServiceIds } }
  });

  const validAccounts = await prisma.accountForSale.findMany({
   where: { id: { in: accountIds } }
  });

  const validCustomAccounts = await prisma.customAccount.findMany({
   where: { id: { in: customAccountIds } }
  });

  const validCartItems = cartItems.filter((item: CartItem) => {
   const itemId = parseInt(item.id.split("-")[2]);

   if (item.id.startsWith("package-"))
    return validPackages.some((pkg) => pkg.id === itemId);
   if (item.id.startsWith("service-"))
    return validServices.some((svc) => svc.id === itemId);
   if (item.id.startsWith("customService-"))
    return validCustomServices.some((cs) => cs.id === itemId);
   if (item.id.startsWith("account-"))
    return validAccounts.some((account) => account.id === itemId);
   if (item.id.startsWith("customAccount-"))
    return validCustomAccounts.some(
     (customAccount) => customAccount.id === itemId
    );

   return false;
  });

  return NextResponse.json({ validCartItems });
 } catch (error: any) {
  console.error("Error validating cart items:", error.message);
  return new NextResponse(JSON.stringify({ message: error.message }), {
   status: 500
  });
 }
}
