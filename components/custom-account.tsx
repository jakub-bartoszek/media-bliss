"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Button from "./button";
import { CartItem } from "@/types";
import useCustomAccounts from "@/lib/hooks/useCustomAccounts";
import { Category, CustomAccount } from "@prisma/client";
import Error from "./error";

interface CustomAccountSectionProps {
 category: Category;
 handleAddToCart: (item: CartItem) => void;
}

export const CustomAccountSection = ({
 category,
 handleAddToCart
}: CustomAccountSectionProps) => {
 const { customAccounts, loading, error } = useCustomAccounts(category);
 const [selectedAccount, setSelectedAccount] = useState<CustomAccount | null>(
  null
 );
 const [quantity, setQuantity] = useState<number>(0);
 const [totalPrice, setTotalPrice] = useState<string>("0.00");

 const maxQuantity = category === "Instagram" ? 600000 : 200000;

 useEffect(() => {
  if (customAccounts.length > 0) {
   const account = customAccounts.find(
    (account) => account.category === category
   );
   setSelectedAccount(account || null);
  }
 }, [customAccounts, category]);

 useEffect(() => {
  if (selectedAccount) {
   const price = parseFloat(selectedAccount.pricePerFollow.toString());
   const total = price * quantity;
   setTotalPrice(total.toFixed(2));
  } else {
   setTotalPrice("0.00");
  }
 }, [selectedAccount, quantity]);

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  const clampedValue = Math.max(0, Math.min(value, maxQuantity));
  setQuantity(isNaN(clampedValue) ? 0 : clampedValue);
 };

 const handleQuantityBlur = () => {
  if (quantity < 100) {
   setQuantity(100);
  } else if (quantity > maxQuantity) {
   setQuantity(maxQuantity);
  }
 };

 if (loading) return null;

 if (error) return <Error />;

 return (
  <section className="m-4 my-32 flex flex-col justify-between md:flex-row ">
   <div className="flex w-full flex-col gap-4 md:w-2/3">
    <h2 className="text-center text-5xl font-bold md:text-left">
     Konto {category} na zamówienie
    </h2>
    <p className="text-center text-xl md:text-left mb-4">
     Potrzebujesz konta o wybranej liczbie obserwacji? Zajmiemy się tym!
    </p>
    <p className="hidden md:block text-center italic text-zinc-400 md:text-left">
     Dostarczone konto nie będzie miało dokładnej liczby obserwujących jaką
     podałeś/aś.
    </p>
   </div>
   <div className="w-full rounded-md border-2 p-4 md:w-[250px] border-neon-purple bg-white dark:bg-ebony">
    <div>
     <p className="text-xl font-bold">Konto {category}</p>
     <p className="break-words text-3xl font-bold text-fade">
      {totalPrice} PLN
     </p>
    </div>
    <div>
     <input
      className="border-2 rounded-md p-2 mt-20 w-full border-neon-purple"
      onBlur={handleQuantityBlur}
      onChange={handleQuantityChange}
      value={quantity}
      type="number"
      max={maxQuantity}
      min={0}
     />
    </div>
    <Button
     onClick={() =>
      selectedAccount &&
      handleAddToCart({
       id: nanoid(),
       name: `Konto ${selectedAccount.category} × ${quantity} obserwujących`,
       category: selectedAccount.category,
       price: parseFloat(totalPrice),
       requireLink: false
      })
     }
     disabled={quantity < 100}
     className="mt-4 w-full bg-fade"
    >
     Dodaj do koszyka
    </Button>
   </div>
  </section>
 );
};
