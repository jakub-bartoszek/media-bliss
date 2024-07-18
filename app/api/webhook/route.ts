import { NextRequest, NextResponse } from "next/server";
import { checkoutManager } from "@/lib/checkout-manager";
import { prisma } from "@/lib/server/database/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
 const payload = await req.text();
 const sig = req.headers.get("stripe-signature");

 let event;

 try {
  event = stripe.webhooks.constructEvent(
   payload,
   sig,
   process.env.STRIPE_WEBHOOK_SECRET // Set this in your environment variables
  );
  console.log("Event constructed successfully");
 } catch (err: any) {
  console.error(
   "Webhook signature verification failed:",
   err.message
  );
  return new NextResponse("Webhook Error: " + err.message, {
   status: 400
  });
 }

 console.log("Event type:", event.type);

 if (event.type === "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Session:", session);

  const sessionId = session.id;
  const customerEmail = session.customer_email;
  const cartItems = checkoutManager.getSession(sessionId);

  console.log("Session ID:", sessionId);
  console.log("Customer Email:", customerEmail);
  console.log("Cart Items:", cartItems);

  try {
   await prisma.order.create({
    data: {
     contents: JSON.stringify(cartItems),
     email: customerEmail || "unknown@example.com",
     status: "Niezrealizowane"
    }
   });

   checkoutManager.consumeSession(
    sessionId,
    customerEmail || "unknown@example.com"
   );

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
