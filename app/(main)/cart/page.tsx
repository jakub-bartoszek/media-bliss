"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Service } from "@prisma/client";

interface CartItem extends Service {
 cartId: string;
}

const stripePromise = loadStripe(
 process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Cart = () => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCartItems(storedCart);
 }, []);

 const removeItemFromCart = (cartId: string) => {
  const updatedCart = cartItems.filter(
   (item) => item.cartId !== cartId
  );
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
 };

 const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.price, 0);
 };

 const handleBuy = async () => {
  const stripe = await stripePromise;

  if (!stripe) {
   console.error("Stripe has not loaded.");
   return;
  }

  try {
   const response = await axios.post("/api/checkout", { cartItems });
   const sessionId = response.data.id;

   await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
   console.error("Error redirecting to checkout", error);
  }
 };

 return (
  <div className="w-full h-full p-4">
   <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
   {cartItems.length > 0 ? (
    <div className="flex flex-col gap-4">
     {cartItems.map((item) => (
      <div
       key={item.cartId}
       className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-white"
      >
       <div>
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-lg text-gray-500">{item.price} PLN</p>
       </div>
       <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => removeItemFromCart(item.cartId)}
       >
        Remove
       </button>
      </div>
     ))}
     <div className="flex justify-between items-center p-4 border-t mt-4">
      <h2 className="text-xl font-semibold">Total</h2>
      <p className="text-lg text-gray-500">
       {calculateTotal().toFixed(2)} PLN
      </p>
     </div>
     <button
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg self-end"
      onClick={handleBuy}
     >
      Buy
     </button>
    </div>
   ) : (
    <p className="text-lg text-gray-500">Your cart is empty.</p>
   )}
  </div>
 );
};

export default Cart;
