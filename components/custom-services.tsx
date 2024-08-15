"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/types";
import { nanoid } from "nanoid";
import { Category, CustomService } from "@prisma/client";
import useCustomServices from "@/lib/hooks/useCustomServices";
import Button from "./button";
import Error from "./error";

interface CustomServiceProps {
 category: Category;
 handleAddToCart: (item: CartItem) => void;
}

export const CustomServices = ({
 category,
 handleAddToCart
}: CustomServiceProps) => {
 const { customServices, loading, error } = useCustomServices(category);
 const [selectedService, setSelectedService] = useState<CustomService | null>(
  null
 );
 const [quantity, setQuantity] = useState<number>(0);
 const [totalPrice, setTotalPrice] = useState<string>("0.00");

 useEffect(() => {
  if (selectedService) {
   const price = parseFloat(selectedService.pricePerUnit.toString());
   const total = price * quantity;
   setTotalPrice(total.toFixed(2));
  } else {
   setTotalPrice("0.00");
  }
 }, [selectedService, quantity]);

 const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const service = customServices.find(
   (service) => service.name === e.target.value
  );
  setSelectedService(service || null);
  setQuantity(0);
 };

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value, 10);
  const clampedValue = Math.max(0, Math.min(value, 1000000));
  setQuantity(isNaN(clampedValue) ? 0 : clampedValue);
 };

 const handleQuantityBlur = () => {
  if (quantity < 100) {
   setQuantity(100);
  } else if (quantity > 1000000) {
   setQuantity(1000000);
  }
 };

 if (loading) return null;

 if (error) return <Error />;

 return (
  <section className="m-4 flex flex-col justify-between gap-4 rounded-md border-2 p-4 md:flex-row-reverse">
   <div className="flex w-full flex-col gap-4 md:w-2/3">
    <h2 className="text-center text-5xl font-bold text-primary md:text-left">
     Własna usługa
    </h2>
    <p className="text-center text-xl md:text-left">
     Pakiety nie spełniają twoich oczekiwań? Przygotowaliśmy dla ciebie
     możliwość dostosowania naszych usług do twoich potrzeb.
    </p>
    <select
     className="rounded-md border-2 p-2"
     onChange={handleServiceChange}
     value={selectedService?.name || ""}
    >
     <option value="">Wybierz usługę</option>
     {customServices.map((service) => (
      <option
       key={service.id}
       value={service.name}
      >
       {service.name}
      </option>
     ))}
    </select>
   </div>
   <div className="w-full rounded-md border-2 p-4 md:w-[250px]">
    <div>
     <p className="text-xl font-bold">
      {selectedService ? selectedService.name : "Twoja usługa"}
     </p>
     <p className="break-words text-3xl font-bold">{totalPrice} PLN</p>
    </div>
    <input
     className="mt-20 w-full rounded-md border-2 p-2"
     onBlur={handleQuantityBlur}
     onChange={handleQuantityChange}
     value={quantity}
     type="number"
     min={0}
     max={1000000}
    />
    <Button
     onClick={() =>
      selectedService &&
      handleAddToCart({
       id: nanoid(),
       name: `${selectedService?.name} × ${quantity}`,
       category: selectedService?.category,
       price: parseFloat(totalPrice),
       requireLink: true
      })
     }
     disabled={!selectedService || quantity < 100}
     className="w-full mt-4"
    >
     Dodaj do koszyka
    </Button>
   </div>
  </section>
 );
};
