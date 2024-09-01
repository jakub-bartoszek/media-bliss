"use client";

import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import Button from "@/components/button";
import CartTile from "@/components/cart-tile";
import useCart from "@/lib/hooks/useCart";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { BiError } from "react-icons/bi";

const Cart = () => {
 const {
  cartItems,
  loading,
  error,
  removeItemFromCart,
  calculateTotal,
  setCartItems
 } = useCart();
 const [errors, setErrors] = useState<{ [key: string]: string }>({});
 const router = useRouter();

 const validateAllLinks = () => {
  let valid = true;
  const updatedErrors: { [key: string]: string } = {};

  cartItems.forEach((item) => {
   if (item.selected && item.requireLink === true) {
    const regex =
     item.category === "Instagram"
      ? /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)\.]+\/?$/
      : /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(_)\.]+\/?$/;

    if (!regex.test(item.accountLink || "")) {
     valid = false;
     updatedErrors[item.id] =
      item.category === "Instagram"
       ? "Please enter a valid Instagram account link."
       : "Please enter a valid TikTok account link.";
    }
   }
  });

  setErrors(updatedErrors);
  return valid;
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

 const renderCartContent = () => {
  if (loading) {
   return (
    <div className="flex items-center justify-center h-full">
     <Loader2 className="animate-spin w-16 h-16 text-accent" />
    </div>
   );
  }
  if (error) {
   return (
    <div className="flex flex-col items-center justify-center h-full">
     <BiError className="w-16 h-16 text-accent" />
     <p className="text-xl font-bold text-muted">Coś poszło nie tak...</p>
    </div>
   );
  }
  if (cartItems.length === 0)
   return (
    <div className="flex flex-col items-center justify-center h-full">
     <FaShoppingCart className="w-16 h-16 text-muted" />
     <p className="text-xl font-bold text-secondary-muted">
      Twój koszyk jest pusty
     </p>
    </div>
   );
  return (
   <>
    {cartItems.map((item) => (
     <CartTile
      key={item.id}
      item={item}
      removeItemFromCart={removeItemFromCart}
      cartItems={cartItems}
      setCartItems={setCartItems}
      errors={errors}
      setErrors={setErrors}
     />
    ))}
   </>
  );
 };

 return (
  <div className="w-full h-full flex flex-col justify-center">
   <form
    onSubmit={handleSubmit}
    className="p-4 pt-16"
   >
    <h1 className="text-3xl font-bold mb-8 mt-8">Your Cart</h1>
    <div className="w-full flex flex-col md:flex-row gap-4">
     <div className="w-full md:w-2/3 flex flex-col gap-4">
      {renderCartContent()}
     </div>
     <div className="w-full md:w-1/3">
      <div className="p-4 border bg-bg-content border-accent rounded-lg">
       <h2 className="text-2xl font-semibold">Summary</h2>
       <div className="mt-4">
        <div className="flex justify-between">
         <span>Product Value</span>
         <span>{calculateTotal().toFixed(2)} PLN</span>
        </div>
       </div>
       <div className="flex justify-between items-center mt-4 pt-4 border-t border-secondary-muted">
        <span className="text-xl font-bold">Total</span>
        <span className="text-xl font-bold">
         {calculateTotal().toFixed(2)} PLN
        </span>
       </div>
       <div className="mt-6">
        <Button
         disabled={
          cartItems.filter((item) => item.selected === true).length === 0
         }
         className="w-full bg-fade"
         type="submit"
        >
         Proceed to Checkout
        </Button>
       </div>
      </div>
     </div>
    </div>
   </form>
  </div>
 );
};

export default Cart;
