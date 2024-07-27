"use client";

import Button from "@/components/button";
import { ServiceWithDecimalPrice } from "@/types";
import { useState } from "react";

interface ServiceOthersTileProps {
 service: ServiceWithDecimalPrice;
 onSelect?: () => void;
}

const ServiceOthersTile = ({ service, onSelect }: ServiceOthersTileProps) => {
 const [modalOpen, setModalOpen] = useState(false);

 return (
  <>
   <div className="bg-white rounded-md border-2 border-black/10 flex flex-col justify-between flex-shrink box-border overflow-hidden w-full md:min-w-[214px] md:basis-0">
    <div className="flex flex-row-reverse md:flex-col justify-between h-full border-b-2">
     <div className="p-4 flex flex-col h-full w-full md:justify-between gap-2 md:gap-4">
      <div className="font-bold text-xl">{service.name}</div>
      <div>
       {/* <button
        onClick={() => setModalOpen(true)}
        className="underline"
       >
        Dowiedz się więcej
       </button> */}
       <div className="text-4xl font-bold text-primary">
        {service.price} PLN
       </div>
      </div>
     </div>
     <img
      className="h-[200px] md:w-full md:h-auto"
      src={service.image}
     />
    </div>
    <div className="flex items-center justify-center p-4">
     <Button
      className="w-full"
      onClick={onSelect}
     >
      Dodaj do koszyka
     </Button>
    </div>
   </div>
   {modalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
     <div className="bg-white p-4 rounded-lg relative  max-w-[500px]">
      <button
       onClick={() => setModalOpen(!modalOpen)}
       className="absolute top-2 right-4 text-2xl"
      >
       &times;
      </button>
      <div>
       <div className="text-3xl text-primary font-bold mb-4">
        {service.name}
       </div>
       <div className="mb-2 text-lg">{service.description}</div>
       <ul className="list-disc marker:text-primary ml-6">
        {service.list.map((item) => (
         <li className="mb-2">{item}</li>
        ))}
       </ul>
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default ServiceOthersTile;
