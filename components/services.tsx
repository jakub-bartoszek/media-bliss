"use client";

import { useState } from "react";
import CartModal from "@/components/cart-modal";
import ServiceOthersTile from "@/components/service-others-tile";
import ServicePackageTile from "@/components/service-package-tile";
import { FaInstagram } from "react-icons/fa";
import { Service, ServiceCategory } from "@prisma/client";
import { FaTiktok } from "react-icons/fa6";

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

 const handleProductSelect = (product: Service) => {
  setSelectedProduct(product);
  setIsModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
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
     {services.filter((service) => service.type === "Others")
      .length !== 0 && (
      <>
       <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
        Pozostałe
       </h2>
       <div className="flex flex-wrap justify-center gap-4 mb-16">
        {services
         .filter((service) => service.type === "Others")
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
