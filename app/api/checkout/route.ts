import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

globalThis.sessions = globalThis.sessions || new Map();

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();
  const cartItems = body.cartItems;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
   throw new Error("Cart items are invalid or empty.");
  }

  const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card"],
   line_items: cartItems.map((item: any) => ({
    price_data: {
     currency: "pln",
     product_data: {
      name: item.name
     },
     unit_amount: item.price * 100
    },
    quantity: 1
   })),
   mode: "payment",
   success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
   cancel_url: `${req.nextUrl.origin}/cancel`
  });

  const serializedCartItems = JSON.stringify(cartItems);
  globalThis.sessions.set(session.id, {
   content: serializedCartItems
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