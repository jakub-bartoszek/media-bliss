import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/database/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

interface CartItem {
 name: string;
 price: number;
 accountLink: string;
 description: string;
 image: string;
 category: string;
 type: string;
}

interface SessionData {
 content: string;
 dateOfPurchase: string;
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
  const customerEmail =
   session.customer_details?.email || "unknown@example.com";
  const sessionData = globalThis.sessions.get(sessionId);

  console.log("Session ID:", sessionId);
  console.log("Customer Email:", customerEmail);
  console.log("Session Data:", sessionData);

  if (!sessionData) {
   console.error(`Session ID: ${sessionId} has no associated cart items`);
   return new NextResponse("Session not found", { status: 400 });
  }

  const cartItems: CartItem[] = JSON.parse(sessionData.content);
  console.log("Deserialized Cart Items:", cartItems);

  try {
   await prisma.order.create({
    data: {
     email: customerEmail,
     status: "Niezrealizowane"
    }
   });

   globalThis.sessions.delete(sessionId);

   console.log("Order created successfully!");
  } catch (err: any) {
   console.error("Error creating order:", err.message);
   return new NextResponse("Order creation error: " + err.message, {
    status: 500
   });
  }
 }

 return new NextResponse("Received", { status: 200 });
}
