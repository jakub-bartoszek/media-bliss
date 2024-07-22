"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CartItemWithAccountLink } from "@/types";

const stripePromise = loadStripe(
 process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Cart = () => {
 const [cartItems, setCartItems] = useState<
  CartItemWithAccountLink[]
 >([]);

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

 const updateAccountLink = (cartId: string, accountLink: string) => {
  const updatedCart = cartItems.map((item) =>
   item.cartId === cartId ? { ...item, accountLink } : item
  );
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
 };

 const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
   const price =
    typeof item.price === "number" ? item.price : Number(item.price);
   return total + price;
  }, 0);
 };

 const handleBuy = async () => {
  const stripe = await stripePromise;

  if (!stripe) {
   console.error("Stripe has not loaded.");
   return;
  }

  try {
   const response = await axios.post("/api/checkout", {
    cartItems: cartItems.map(({ name, price, accountLink }) => ({
     name,
     price,
     accountLink
    }))
   });
   const sessionId = response.data.id;

   await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
   console.error("Error redirecting to checkout", error);
  }
 };

 return (
  <div className="w-full h-full p-4 pt-16 bg-gray-100 text-black flex flex-col justify-center">
   <h1 className="text-3xl font-bold mb-8 text-gray-800 mt-8">
    Twój koszyk
   </h1>
   <div className="w-full flex flex-col md:flex-row gap-4">
    <div className="w-full md:w-2/3">
     {cartItems.length > 0 ? (
      <div className="flex flex-col gap-4">
       {cartItems.map((item) => (
        <div
         key={item.cartId}
         className="flex justify-between items-center p-4 border rounded-lg gap-4"
        >
         <div className="w-1/2">
          <h2 className="text-xl font-semibold ">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.category}</p>
          <span className="text-lg font-semibold mr-4 text-primary">
           {Number(item.price).toFixed(2)} PLN
          </span>
         </div>
         <div className="flex items-center w-1/2 justify-between">
          {item.type === "Service" ||
          item.type === "CustomService" ? (
           <input
            className="p-2 border border-gray-300 rounded-md text-gray-700 w-full"
            placeholder="Link do konta"
            value={item.accountLink}
            onChange={(e) =>
             updateAccountLink(item.cartId, e.target.value)
            }
           />
          ) : (
           <p className="text-gray-500">
            Produkt zostanie dostarczony na email
           </p>
          )}
          <button
           className="ml-4 p-2 text-gray-500 hover:text-gray-700 transition"
           onClick={() => removeItemFromCart(item.cartId)}
          >
           <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
           >
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M6 18L18 6M6 6l12 12"
            ></path>
           </svg>
          </button>
         </div>
        </div>
       ))}
      </div>
     ) : (
      <p className="text-lg text-gray-500">Twój koszyk jest pusty.</p>
     )}
    </div>
    <div className="w-full md:w-1/3">
     <div className="p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold">Podsumowanie</h2>
      <div className="mt-4">
       <div className="flex justify-between">
        <span>Wartość produktów</span>
        <span>{calculateTotal().toFixed(2)} PLN</span>
       </div>
       <div className="flex justify-between mt-2">
        <span>Dostawa</span>
        <span>0.00 PLN</span>
       </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
       <span className="text-xl font-bold">Razem</span>
       <span className="text-xl font-bold">
        {calculateTotal().toFixed(2)} PLN
       </span>
      </div>
      <button
       className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
       onClick={handleBuy}
      >
       Zapłać
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Cart;