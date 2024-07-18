import { NextRequest, NextResponse } from "next/server";
import { checkoutManager } from "@/lib/checkout-manager";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();
  const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card"],
   line_items: body.cartItems.map((item: any) => ({
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

  checkoutManager.addSession(
   session.id,
   JSON.stringify(body.cartItems)
  );
  return NextResponse.json({ id: session.id });
 } catch (err: any) {
  console.error("Error creating checkout session:", err);
  return new NextResponse(JSON.stringify({ message: err.message }), {
   status: 500
  });
 }
}

export async function OPTIONS() {
 return new NextResponse("OK", { status: 200 });
}
