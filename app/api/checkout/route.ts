import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

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

globalThis.sessions =
 globalThis.sessions || new Map<string, SessionData>();

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();
  const cartItems: CartItem[] = body.cartItems;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
   throw new Error("Cart items are invalid or empty.");
  }

  const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card"],
   line_items: cartItems.map((item: CartItem) => ({
    price_data: {
     currency: "pln",
     product_data: {
      name: item.name,
      metadata: {
       category: item.category,
       type: item.type,
       accountLink: item.accountLink
      }
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
   content: serializedCartItems,
   dateOfPurchase: new Date().toISOString() // Add date of purchase
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
