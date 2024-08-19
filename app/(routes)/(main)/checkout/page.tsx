"use client";

import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import CheckBox from "@/components/check-box";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Button from "@/components/button";

const stripePromise = loadStripe(
 process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Checkout = () => {
 const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
 const [submitting, setSubmitting] = useState(false);
 const [name, setName] = useState("");
 const [lastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [phoneNumber, setPhoneNumber] = useState("");
 const [termsAccepted, setTermsAccepted] = useState(false);

 const router = useRouter();

 useEffect(() => {
  const storedItems = localStorage.getItem("selectedCartItems");
  if (storedItems) {
   setSelectedItems(JSON.parse(storedItems));
  } else {
   router.push("/");
  }
 }, [router]);

 const calculateTotal = () => {
  return selectedItems.reduce((total, item) => {
   const price =
    typeof item.price === "number" ? item.price : Number(item.price);
   return total + price;
  }, 0);
 };

 const handleCheckout = async (event: React.FormEvent) => {
  event.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   toast.error("Invalid email address.");
   return;
  }

  const phoneRegex = /^\+?\d[\d\s]{8,14}\d$/;
  if (!phoneRegex.test(phoneNumber)) {
   toast.error("Invalid phone number.");
   return;
  }

  const stripe = await stripePromise;
  if (!stripe) {
   toast.error("Stripe has not loaded.");
   return;
  }

  setSubmitting(true);

  try {
   const response = await axios.post("/api/checkout", {
    cartItems: selectedItems.map(
     ({ name, price, accountLink, additionalInfo, category }) => ({
      name,
      price,
      accountLink,
      additionalInfo,
      category
     })
    ),
    customerInfo: {
     name,
     lastName,
     email,
     phoneNumber
    }
   });
   const sessionId = response.data.id;
   await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
   toast.error(`Error redirecting to checkout: ${error}`);
   setSubmitting(false);
  }
 };

 return (
  <div className="w-full h-full text-black flex flex-col justify-center">
   {selectedItems.length === 0 ? (
    <div className="w-full h-screen flex items-center justify-center flex-col text-zinc-400">
     <div>Brak wybranych produktów do zakupu</div>
    </div>
   ) : (
    <div className="p-4 pt-16">
     <h1 className="text-3xl font-bold mb-8 text-zinc-800 mt-8">
      Podsumowanie zakupu
     </h1>
     <form
      className="w-full flex flex-col md:flex-row gap-4"
      onSubmit={handleCheckout}
     >
      <div className="w-full md:w-2/3 flex flex-col gap-4">
       <div className="p-4 border-2 rounded-lg">
        <h2 className="text-2xl font-semibold">Informacje kontaktowe</h2>
        <div className="mt-4 flex flex-col gap-4">
         <div className="flex flex-col">
          <label htmlFor="name">
           Imię<span className=" ">*</span>
          </label>
          <input
           id="name"
           type="text"
           className="p-2 border rounded"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
          />
         </div>
         <div className="flex flex-col">
          <label htmlFor="lastName">
           Nazwisko<span className=" ">*</span>
          </label>
          <input
           type="text"
           id="lastName"
           className="p-2 border rounded"
           value={lastName}
           onChange={(e) => setLastName(e.target.value)}
           required
          />
         </div>
         <div className="flex flex-col">
          <label htmlFor="email">
           Email<span className=" ">*</span>
          </label>
          <input
           type="email"
           id="email"
           className="p-2 border rounded"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
          />
         </div>
         <div className="flex flex-col">
          <label htmlFor="phoneNumber">
           Numer telefonu<span className=" ">*</span>
          </label>
          <InputMask
           mask="+99 999 999 999"
           id="phoneNumber"
           value={phoneNumber}
           onChange={(e) => setPhoneNumber(e.target.value)}
           className="p-2 border rounded"
           required
          />
         </div>
        </div>
       </div>
       {selectedItems.map((item) => (
        <div
         key={item.id}
         className="flex flex-col border rounded-lg p-4"
        >
         <div className="flex flex-col justify-between">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-sm text-zinc-500">{item.category}</p>
          <p className="text-lg font-semibold mr-4  ">
           {Number(item.price).toFixed(2)} PLN
          </p>
          {item.accountLink && <p>{item.accountLink}</p>}
          {item.additionalInfo && <p>{item.additionalInfo}</p>}
         </div>
        </div>
       ))}
      </div>
      <div className="w-full md:w-1/3">
       <div className="p-4 border rounded-lg bg-white">
        <h2 className="text-2xl font-semibold">Podsumowanie</h2>
        <div className="mt-4">
         {selectedItems.map((item) => (
          <div
           className="flex justify-between gap-2 items-center"
           key={item.id}
          >
           <span className="truncate">{item.name}</span>
           <span className="whitespace-nowrap font-bold">{item.price} PLN</span>
          </div>
         ))}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-300">
         <span className="text-xl font-bold">Razem</span>
         <span className="text-xl font-bold">
          {calculateTotal().toFixed(2)} PLN
         </span>
        </div>
        <div className="mt-6">
         <Button
          disabled={
           !termsAccepted ||
           name === "" ||
           lastName === "" ||
           email === "" ||
           phoneNumber === ""
          }
          className="w-full"
          type="submit"
         >
          {submitting ? "Przetwarzanie..." : "Przejdź do kasy"}
         </Button>
        </div>
        <div className="flex gap-x-2 mt-4">
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
       </div>
      </div>
     </form>
    </div>
   )}
  </div>
 );
};

export default Checkout;
