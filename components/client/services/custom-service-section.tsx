import { useState } from "react";
import { nanoid } from "nanoid";
import { ServiceWithDecimalPrice, CartItem } from "@/types";
import Button from "@/components/button";

const CustomServiceSection = ({
 services,
 setSelectedProduct,
 setIsCartModalOpen
}: {
 services: ServiceWithDecimalPrice[];
 setSelectedProduct: (product: CartItem) => void;
 setIsCartModalOpen: (isOpen: boolean) => void;
}) => {
 const [customServiceId, setCustomServiceId] = useState<string>("");
 const [quantity, setQuantity] = useState<number>(0);
 const [customServicePrice, setCustomServicePrice] = useState<number>(0);
 const [customServiceName, setCustomServiceName] = useState<string>("");

 const maxQuantity = 1000000;

 const handleAddCustomService = () => {
  const selectedService = services.find(
   (service) => service.id.toString() === customServiceId
  );
  if (!selectedService) return;

  const customProduct: CartItem = {
   ...selectedService,
   cartId: nanoid(),
   name: `${quantity} × ${selectedService.name}`,
   price: customServicePrice
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(customProduct);
  localStorage.setItem("cart", JSON.stringify(cart));

  setSelectedProduct(customProduct);
  setIsCartModalOpen(true);
 };

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const qty = value === "" ? 0 : Math.min(parseInt(value, 10), maxQuantity);

  if (!isNaN(qty)) {
   setQuantity(qty);

   const selectedService = services.find(
    (service) => service.id.toString() === customServiceId
   );
   if (selectedService) {
    setCustomServicePrice(qty * selectedService.price);
   }
  }
 };

 const handleQuantityBlur = () => {
  if (quantity < 100) {
   setQuantity(100);

   const selectedService = services.find(
    (service) => service.id.toString() === customServiceId
   );
   if (selectedService) {
    setCustomServicePrice(100 * selectedService.price);
   }
  }
 };

 const customServices = services.filter(
  (service) => service.type === "CustomService"
 );

 if (customServices.length === 0) {
  return null;
 }

 return (
  <section className="flex flex-col md:flex-row-reverse justify-between gap-16 text-zinc-700 p-4 border-2 rounded-lg py-16">
   <div className="w-full md:w-2/3">
    <h2 className="w-full text-5xl text-center md:text-left font-bold mb-4 text-primary">
     Własna usługa
    </h2>
    <p className="text-xl mb-8">
     Pakiety nie spełniają twoich oczekiwań? Przygotowaliśmy dla ciebie
     możliwość dostosowania naszych usług do twoich potrzeb.
    </p>
    <select
     className="border-2 p-2 rounded-lg w-full"
     onChange={(e) => {
      setCustomServiceId(e.target.value);
      const selectedService = customServices.find(
       (service) => service.id.toString() === e.target.value
      );
      if (selectedService) {
       setCustomServiceName(selectedService.name);
       setCustomServicePrice(0);
       setQuantity(0);
      }
     }}
     value={customServiceId}
    >
     <option value="">Wybierz usługę</option>
     {customServices.map((service) => (
      <option
       key={service.id}
       value={service.id}
      >
       {service.name}
      </option>
     ))}
    </select>
   </div>
   <div className="flex flex-col items-center p-4 rounded-lg border-2 justify-between border-black/10 w-full md:w-[300px] h-[300px]">
    <div className="w-full mb-16">
     <p className="w-full text-xl font-bold text-nowrap">
      {customServiceName ? customServiceName : "Twoja usługa"}
     </p>
     <p className="w-full text-3xl font-bold">
      {customServicePrice.toFixed(2)} PLN
     </p>
    </div>
    <div className="w-full">
     <input
      type="number"
      className="border-2 p-2 w-full mb-4 rounded-lg border-black/10"
      placeholder="Ilość"
      value={quantity}
      onChange={handleQuantityChange}
      onBlur={handleQuantityBlur}
      min={100}
      max={maxQuantity}
     />
     <Button
      className="w-full"
      onClick={handleAddCustomService}
     >
      Dodaj do koszyka
     </Button>
    </div>
   </div>
  </section>
 );
};

export default CustomServiceSection;
