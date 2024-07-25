"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CartItemWithAccountLink } from "@/types";
import { twMerge } from "tailwind-merge";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import Button from "@/components/button";
import CheckBox from "@/components/check-box";

const stripePromise = loadStripe(
 process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Cart = () => {
 const [cartItems, setCartItems] = useState<CartItemWithAccountLink[]>([]);
 const [errors, setErrors] = useState<{ [key: string]: string }>({});
 const [termsAccepted, setTermsAccepted] = useState(false);
 const [submitting, setSubmitting] = useState(false);

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCartItems(storedCart);
 }, []);

 const removeItemFromCart = (cartId: string) => {
  const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
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

 const validateAccountLink = (
  cartId: string,
  accountLink: string,
  category: string
 ) => {
  const regex =
   category === "Instagram"
    ? /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)\.]+\/?$/
    : /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(_)\.]+\/?$/;

  const errorMessage =
   category === "Instagram"
    ? "Please enter a valid Instagram account link."
    : "Please enter a valid TikTok account link.";

  if (!regex.test(accountLink)) {
   setErrors((prev) => ({ ...prev, [cartId]: errorMessage }));
  } else {
   setErrors((prev) => {
    const { [cartId]: _, ...rest } = prev;
    return rest;
   });
  }
 };

 const validateAllLinks = () => {
  let valid = true;
  cartItems.forEach((item) => {
   if (item.requireLink === "true") {
    const regex =
     item.category === "Instagram"
      ? /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)\.]+\/?$/
      : /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(_)\.]+\/?$/;
    if (!regex.test(item.accountLink)) {
     valid = false;
     setErrors((prev) => ({
      ...prev,
      [item.cartId]:
       item.category === "Instagram"
        ? "Please enter a valid Instagram account link."
        : "Please enter a valid TikTok account link."
     }));
    }
   }
  });
  return valid;
 };

 const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
   const price =
    typeof item.price === "number" ? item.price : Number(item.price);
   return total + price;
  }, 0);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!validateAllLinks()) {
   console.error("Some account links are invalid.");
   return;
  }

  const stripe = await stripePromise;

  if (!stripe) {
   console.error("Stripe has not loaded.");
   return;
  }

  setSubmitting(true);

  try {
   const response = await axios.post("/api/checkout", {
    cartItems: cartItems.map(
     ({ name, price, accountLink, description, image, category, type }) => ({
      name,
      price,
      accountLink,
      description,
      image,
      category,
      type
     })
    )
   });
   const sessionId = response.data.id;

   await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
   console.error("Error redirecting to checkout", error);
   setSubmitting(false);
  }
 };

 return (
  <div className="w-full h-full text-black flex flex-col justify-center">
   {cartItems.length === 0 ? (
    <div className="w-full h-screen flex items-center justify-center flex-col text-zinc-400">
     <FaShoppingCart className="w-24 h-24 text-zinc-500" />
     <div>Brak produktów w koszyku</div>
    </div>
   ) : (
    <form
     onSubmit={handleSubmit}
     className="p-4 pt-16"
    >
     <h1 className="text-3xl font-bold mb-8 text-zinc-800 mt-8">Twój koszyk</h1>
     <div className="w-full flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
       <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
         <div
          key={item.cartId}
          className="flex justify-between items-center p-4 py-6 md:py-4 border rounded-lg gap-4"
         >
          <div className="w-1/2">
           <h2 className="text-xl font-semibold">{item.name}</h2>
           <p className="text-sm text-zinc-500">{item.category}</p>
           <p className="text-sm text-zinc-500">{item.description}</p>
           <span className="text-lg font-semibold mr-4 text-primary">
            {Number(item.price).toFixed(2)} PLN
           </span>
          </div>
          <div className="flex items-center w-2/3 justify-between">
           <div className="w-full">
            {item.requireLink === "true" ? (
             <div className="relative">
              <input
               required
               className="py-1 px-2 border border-zinc-300 rounded-md text-zinc-700 w-full"
               placeholder="Link do konta"
               value={item.accountLink}
               onChange={(e) => {
                const newLink = e.target.value;
                updateAccountLink(item.cartId, newLink);
                validateAccountLink(item.cartId, newLink, item.category);
               }}
              />
              {errors[item.cartId] && (
               <div className="absolute text-red-500 text-xs mt-1">
                {errors[item.cartId]}
               </div>
              )}
             </div>
            ) : (
             <p className="text-sm text-center">
              Produkt zostanie dostarczony na adres email
             </p>
            )}
           </div>
          </div>
          <Button
           type="button"
           className="p-2 bg-rose-500"
           onClick={() => removeItemFromCart(item.cartId)}
          >
           <BiTrash className="w-5 h-5" />
          </Button>
         </div>
        ))}
       </div>
      </div>
      <div className="w-full md:w-1/3">
       <div className="p-4 border rounded-lg bg-white">
        <h2 className="text-2xl font-semibold">Podsumowanie</h2>
        <div className="mt-4">
         <div className="flex justify-between">
          <span>Wartość produktów</span>
          <span>{calculateTotal().toFixed(2)} PLN</span>
         </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-300">
         <span className="text-xl font-bold">Razem</span>
         <span className="text-xl font-bold">
          {calculateTotal().toFixed(2)} PLN
         </span>
        </div>
        <div className="mt-6">
         <div className="flex gap-x-2 mb-4">
          <CheckBox
           onClick={() => setTermsAccepted(!termsAccepted)}
           checked={termsAccepted}
          />
          <span>
           Zapoznałem/am się i akceptuję{" "}
           <a
            className="underline"
            href="/terms-of-service"
           >
            regulamin
           </a>{" "}
           MediaBliss
          </span>
         </div>
         <Button
          className="w-full"
          type="submit"
          disabled={!termsAccepted || submitting}
         >
          {submitting ? "Przetwarzanie..." : "Zapłać"}
         </Button>
        </div>
       </div>
      </div>
     </div>
    </form>
   )}
  </div>
 );
};

export default Cart;
