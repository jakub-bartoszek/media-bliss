"use client";

import { useState } from "react";
import CartModal from "@/components/cart-modal";
import ServiceOthersTile from "@/components/service-others-tile";
import ServicePackageTile from "@/components/service-package-tile";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Service, ServiceCategory } from "@prisma/client";
import { nanoid } from "nanoid";

const Services = ({
 services,
 category
}: {
 services: Service[];
 category: ServiceCategory;
}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
  useState<Service | null>(null);
 const [customServiceId, setCustomServiceId] = useState<string>("");
 const [quantity, setQuantity] = useState<number>(0);
 const [customServicePrice, setCustomServicePrice] =
  useState<number>(0);

 const handleProductSelect = (product: Service) => {
  const uniqueProduct = {
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

  const customProduct = {
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
  <div className="w-full h-full p-4 pt-32">
   {services && (
    <>
     <h1 className="w-full flex flex-col items-center text-5xl font-bold mb-8 gap-4">
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
      <>
       <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
        Custom Services
       </h2>
       <div className="flex flex-col items-center gap-4 mb-16">
        <select
         className="border-2 p-2"
         onChange={(e) => setCustomServiceId(e.target.value)}
        >
         <option value="">Select a custom service</option>
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
        <input
         type="number"
         className="border-2 p-2"
         placeholder="Quantity"
         value={quantity}
         onChange={handleQuantityChange}
        />
        <p className="text-lg">
         Price: {customServicePrice.toFixed(2)} PLN
        </p>
        <button
         className="px-4 py-2 bg-green-500 text-white rounded-lg"
         onClick={handleAddCustomService}
        >
         Add to Cart
        </button>
       </div>
      </>
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
