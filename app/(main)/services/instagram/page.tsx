"use client"

import CartModal from "@/components/cart-modal";
import ServiceOthersTile from "@/components/service-others-tile";
import ServicePackageTile from "@/components/service-package-tile";
import { services } from "@/services";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

const InstagramServices = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState<any>(null);

 const handleProductSelect = (product: any) => {
  setSelectedProduct(product);
  setIsModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
 };

 return (
  <div className="w-full h-full p-4 pt-32">
   <h1 className="w-full flex flex-col items-center text-5xl font-bold mb-8 gap-4">
    <FaInstagram className="w-24 h-24" />
    Usługi Instagram
   </h1>
   <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
    Pakiety
   </h2>
   <div className="flex flex-wrap justify-center gap-4 mb-16">
    {services.instagram.packages.map((service) => (
     <ServicePackageTile
      key={service.id}
      name={service.name}
      list={service.list}
      price={service.price}
      onSelect={() => handleProductSelect}
     />
    ))}
   </div>
   <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
    Pozostałe
   </h2>
   <div className="flex flex-wrap justify-center gap-4 mb-16">
    {services.instagram.others.map((service) => (
     <ServiceOthersTile
      key={service.id}
      name={service.name}
      image={service.image}
      price={service.price}
      onSelect={() => handleProductSelect}
     />
    ))}
   </div>
   <CartModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    selectedProduct={selectedProduct}
   />
  </div>
 );
};

export default InstagramServices;
