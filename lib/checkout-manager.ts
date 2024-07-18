import { logger } from "./logger";
import { prisma } from "./server/database/prisma";

const STRIPE_CHECKOUT_EXPIRE_TIME =
 process.env.STRIPE_CHECKOUT_EXPIRE_TIME || "3600";

class CheckoutManager {
 private currentSessions = new Map<
  string,
  { expiresAt: number; content: string }
 >();

 constructor() {
  setInterval(() => {
   for (const [k, v] of this.currentSessions.entries()) {
    if (v.expiresAt < Date.now()) this.currentSessions.delete(k);
   }
  }, Number(STRIPE_CHECKOUT_EXPIRE_TIME) * 1000);
 }

 addSession(id: string, content: string) {
  console.log("Storing session:", { id, content }); // Log session data being stored
  this.currentSessions.set(id, {
   expiresAt: Date.now() + Number(STRIPE_CHECKOUT_EXPIRE_TIME) * 1000,
   content
  });
 }

 getSession(id: string) {
  const session = this.currentSessions.get(id);
  console.log("Retrieved session:", session); // Log retrieved session data
  return session ? JSON.parse(session.content) : null;
 }

 async consumeSession(id: string, email: string) {
  const data = this.currentSessions.get(id);

  if (!data) {
   logger.error(
    undefined,
    "An error occurred while confirming the order. The session does not exist."
   );
   return;
  }

  const res = await prisma.order.create({
   data: {
    contents: data.content,
    email,
    status: "Niezrealizowane"
   },
   select: {
    id: true
   }
  });

  this.currentSessions.delete(id);
  logger.info({ orderId: res.id }, "Order confirmed successfully.");
 }
}

export const checkoutManager = new CheckoutManager();
