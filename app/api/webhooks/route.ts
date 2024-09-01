import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/database/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CartItem } from "@/types";

interface SessionData {
 content: string;
 dateOfPurchase: string;
 customerInfo: {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
 };
}

declare global {
 var sessions: Map<string, SessionData>;
}

globalThis.sessions = globalThis.sessions || new Map<string, SessionData>();

export async function POST(req: NextRequest) {
 const payload = await req.text();
 const sig = req.headers.get("stripe-signature");

 if (!sig) {
  return new NextResponse("Webhook signature missing", {
   status: 400
  });
 }

 let event;

 try {
  event = stripe.webhooks.constructEvent(
   payload,
   sig,
   process.env.STRIPE_WEBHOOK_SECRET!
  );
  console.log("Event constructed successfully");
 } catch (err: any) {
  console.error("Webhook signature verification failed:", err.message);
  return new NextResponse("Webhook Error: " + err.message, {
   status: 400
  });
 }

 console.log("Event type:", event.type);

 if (event.type === "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Session:", session);

  const sessionId = session.id;
  const sessionData = globalThis.sessions.get(sessionId);

  if (!sessionData) {
   console.error(`Session ID: ${sessionId} has no associated cart items`);
   return new NextResponse("Session not found", { status: 400 });
  }

  const cartItems: CartItem[] = JSON.parse(sessionData.content);
  const { name, lastName, email, phoneNumber } = sessionData.customerInfo;

  console.log("Deserialized Cart Items:", cartItems);

  try {
   let customer = await prisma.customer.findUnique({
    where: { email: email }
   });

   if (!customer) {
    customer = await prisma.customer.create({
     data: {
      name: `${name} ${lastName}`,
      email: email,
      phoneNumber: phoneNumber
     }
    });
    console.log("Customer created:", customer);
   } else {
    console.log("Customer found:", customer);
   }

   const order = await prisma.order.create({
    data: {
     email: email,
     contents: JSON.stringify(cartItems),
     status: "Niezrealizowane",
     customerId: customer.id,
     dateOfPurchase: new Date()
    }
   });

   console.log("Order created successfully!", order);

   for (const item of cartItems) {
    if (item.id.startsWith("account-")) {
     const accountId = parseInt(item.id.split("-")[2]);
     try {
      await prisma.accountForSale.delete({
       where: { id: accountId }
      });
      console.log(`Account with ID ${accountId} removed from sale.`);
     } catch (err: any) {
      console.error(
       `Failed to remove account with ID ${accountId}:`,
       err.message
      );
      return new NextResponse("Failed to remove account: " + err.message, {
       status: 500
      });
     }
    }
   }

   globalThis.sessions.delete(sessionId);
  } catch (err: any) {
   console.error("Error creating order:", err.message);
   return new NextResponse("Order creation error: " + err.message, {
    status: 500
   });
  }
 }

 return new NextResponse("Received", { status: 200 });
}
