"use client";

import { useState } from "react";
import { ServiceWithDecimalPrice } from "@/types";
import Button from "@/components/button";
import LearnMoreModal from "../modals/learn-more-modal";

interface ServiceOthersTileProps {
 service: ServiceWithDecimalPrice;
 onSelect?: () => void;
}

const ServiceOthersTile = ({ service, onSelect }: ServiceOthersTileProps) => {
 const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);

 const handleLearnMore = () => {
  setIsLearnMoreModalOpen(true);
 };

 return (
  <>
   <div className="bg-white rounded-md border-2 border-black/10 flex flex-col justify-between flex-shrink box-border overflow-hidden w-full md:min-w-[214px] md:basis-0">
    <div className="flex flex-row-reverse md:flex-col justify-between h-full border-b-2">
     <div className="p-4 flex flex-col h-full w-full md:justify-between gap-2 md:gap-4">
      <div className="font-bold text-xl">{service.name}</div>
      <div className="text-4xl font-bold text-primary">{service.price} PLN</div>
     </div>
     <img
      className="h-[200px] md:w-full md:h-auto"
      src={service.image}
     />
    </div>
    <div className="flex flex-col items-center justify-center gap-2 p-4">
     <Button
      className="w-full whitespace-nowrap"
      onClick={onSelect}
     >
      Dodaj do koszyka
     </Button>
     <Button
      className="w-full whitespace-nowrap bg-zinc-600"
      onClick={handleLearnMore}
     >
      Dowiedz się więcej
     </Button>
    </div>
   </div>
   {isLearnMoreModalOpen && (
    <LearnMoreModal
     isOpen={isLearnMoreModalOpen}
     onClose={() => setIsLearnMoreModalOpen(false)}
     service={service}
    />
   )}
  </>
 );
};

export default ServiceOthersTile;
