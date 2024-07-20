"use client";

import { useState } from "react";
import CartModal from "@/components/cart-modal";
import ServiceOthersTile from "@/components/service-others-tile";
import ServicePackageTile from "@/components/service-package-tile";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { ServiceCategory } from "@prisma/client";
import { nanoid } from "nanoid";
import { CartItem, ServiceWithDecimalPrice } from "@/types";

const Services = ({
 services,
 category
}: {
 services: ServiceWithDecimalPrice[];
 category: ServiceCategory;
}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
  useState<ServiceWithDecimalPrice | null>(null);
 const [customServiceId, setCustomServiceId] = useState<string>("");
 const [quantity, setQuantity] = useState<number>(0);
 const [customServicePrice, setCustomServicePrice] =
  useState<number>(0);
 const [customServiceName, setCustomServiceName] =
  useState<string>("");

 const handleProductSelect = (product: ServiceWithDecimalPrice) => {
  const uniqueProduct: CartItem = {
   ...product,
   cartId: nanoid()
  };

  setSelectedProduct(product);
  setIsModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(uniqueProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
 };

 const handleAddCustomService = () => {
  const selectedService = services.find(
   (service) => service.id.toString() === customServiceId
  );
  if (!selectedService) return;

  const customProduct: CartItem = {
   ...selectedService,
   cartId: nanoid(),
   name: `${quantity}x ${selectedService.name}`,
   price: customServicePrice
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(customProduct);
  localStorage.setItem("cart", JSON.stringify(cart));

  setSelectedProduct(customProduct);
  setIsModalOpen(true);
 };

 const handleQuantityChange = (
  e: React.ChangeEvent<HTMLInputElement>
 ) => {
  const qty = parseInt(e.target.value);
  setQuantity(qty);

  const selectedService = services.find(
   (service) => service.id.toString() === customServiceId
  );
  if (selectedService) {
   setCustomServicePrice(qty * selectedService.price);
  }
 };

 return (
  <div className="w-full h-full p-4 pt-16 mb-16">
   {services.length !== 0 && (
    <>
     <h1 className="w-full flex flex-col items-center text-center text-5xl font-bold mb-8 gap-4">
      {category === "Instagram" ? (
       <FaInstagram className="w-24 h-24" />
      ) : (
       <FaTiktok className="w-24 h-24" />
      )}
      Usługi {category}
     </h1>
     {services.filter((service) => service.type === "Package")
      .length !== 0 && (
      <>
       <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
        Pakiety
       </h2>
       <div className="flex flex-wrap justify-center gap-4 mb-16">
        {services
         .filter((service) => service.type === "Package")
         .map((service) => (
          <ServicePackageTile
           key={service.id}
           name={service.name}
           list={service.list}
           price={service.price}
           onSelect={() => handleProductSelect(service)}
          />
         ))}
       </div>
      </>
     )}
     {services.filter((service) => service.type === "Service")
      .length !== 0 && (
      <>
       <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
        Pozostałe
       </h2>
       <div className="flex flex-wrap justify-center gap-4 mb-16">
        {services
         .filter((service) => service.type === "Service")
         .map((service) => (
          <ServiceOthersTile
           key={service.id}
           service={service}
           onSelect={() => handleProductSelect(service)}
          />
         ))}
       </div>
      </>
     )}
     {services.filter((service) => service.type === "CustomService")
      .length !== 0 && (
      <div className="flex flex-col md:flex-row justify-between gap-16 items-center text-zinc-700">
       <div className="w-full md:w-2/3">
        <h2 className="w-full text-5xl text-center md:text-left font-bold mb-4 text-primary">
         Własna usługa
        </h2>
        <p className="text-lg mb-8">
         Pakiety nie spełniają twoich oczekiwań? Przygotowaliśmy dla
         ciebie możliwość dostosowania naszych usług do twoich
         potrzeb.
        </p>
        <select
         className="border-2 p-2 rounded-lg w-full"
         onChange={(e) => {
          setCustomServiceId(e.target.value);
          const selectedService = services.find(
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
         {services
          .filter((service) => service.type === "CustomService")
          .map((service) => (
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
        <div>
         <input
          type="number"
          className="border-2 p-2 w-full mb-4 rounded-lg border-black/10"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
         />
         <button
          className="px-4 py-2 w-full bg-primary hover:bg-primary-light text-white rounded-lg"
          onClick={handleAddCustomService}
         >
          Dodaj do koszyka
         </button>
        </div>
       </div>
      </div>
     )}
    </>
   )}

   {selectedProduct && (
    <CartModal
     isOpen={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     selectedProduct={selectedProduct}
    />
   )}
  </div>
 );
};

export default Services;
