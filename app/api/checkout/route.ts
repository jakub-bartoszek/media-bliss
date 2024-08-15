import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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
 try {
  const body = await req.json();
  const { cartItems, customerInfo } = body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
   throw new Error("Cart items are invalid or empty.");
  }

  const totalAmount = cartItems.reduce((total, item) => {
   return total + item.price * 100;
  }, 0);

  const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card", "blik"],
   line_items: cartItems.map((item: CartItem) => ({
    price_data: {
     currency: "pln",
     product_data: {
      name: item.name,
      metadata: {
       category: item.category,
       accountLink: item.accountLink ?? "",
       additionalInfo: item.additionalInfo ?? null
      }
     },
     unit_amount: item.price * 100
    },
    quantity: 1
   })),
   mode: "payment",
   success_url: `${
    req.nextUrl.origin
   }/success?session_id={CHECKOUT_SESSION_ID}&value=${totalAmount / 100}`,
   cancel_url: `${req.nextUrl.origin}/cancel`
  });

  const serializedCartItems = JSON.stringify(cartItems);
  globalThis.sessions.set(session.id, {
   content: serializedCartItems,
   dateOfPurchase: new Date().toISOString(),
   customerInfo
  });

  console.log(`Session created: ${session.id}`);
  console.log(`Stored Cart Items: ${serializedCartItems}`);

  return NextResponse.json({ id: session.id });
 } catch (err: any) {
  console.error("Error creating checkout session:", err.message);
  return new NextResponse(JSON.stringify({ message: err.message }), {
   status: 500
  });
 }
}

export async function OPTIONS() {
 return new NextResponse("OK", { status: 200 });
}
