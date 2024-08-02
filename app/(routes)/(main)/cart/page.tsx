"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types";
import toast from "react-hot-toast";
import Button from "@/components/button";
import CartTile from "@/components/client/cart/cart-tile";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Cart = () => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [errors, setErrors] = useState<{ [key: string]: string }>({});
 const router = useRouter();

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
   (item: CartItem) => ({ ...item, selected: false })
  );
  setCartItems(storedCart);
 }, []);

 const removeItemFromCart = (cartId: string) => {
  const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("storage"));
 };

 const validateAllLinks = () => {
  let valid = true;
  cartItems.forEach((item) => {
   if (item.selected && item.requireLink === "true") {
    const regex =
     item.category === "Instagram"
      ? /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)\.]+\/?$/
      : /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(_)\.]+\/?$/;
    if (!regex.test(item.accountLink || "")) {
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
   if (item.selected) {
    const price =
     typeof item.price === "number" ? item.price : Number(item.price);
    return total + price;
   }
   return total;
  }, 0);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!validateAllLinks()) {
   toast.error("Some account links are invalid.");
   return;
  }

  const selectedCartItems = cartItems.filter((item) => item.selected);
  localStorage.setItem("selectedCartItems", JSON.stringify(selectedCartItems));

  router.push("/checkout");
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
      <div className="w-full md:w-2/3 flex flex-col gap-4">
       {cartItems.map((item) => (
        <CartTile
         key={item.cartId}
         item={item}
         removeItemFromCart={removeItemFromCart}
         cartItems={cartItems}
         setCartItems={setCartItems}
         errors={errors}
         setErrors={setErrors}
        />
       ))}
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
         <Button
          disabled={
           cartItems.filter((item) => item.selected === true).length === 0
          }
          className="w-full"
          type="submit"
         >
          Przejdź do kasy
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
