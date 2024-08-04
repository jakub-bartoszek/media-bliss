"use client";

import { useState } from "react";
import { ServiceWithDecimalPrice } from "@/types";
import Button from "@/components/button";
import LearnMoreModal from "../modals/learn-more-modal";
import { BiInfoCircle } from "react-icons/bi";

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
   <div className="box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-2 border-black/10 bg-white md:min-w-[214px] md:basis-0">
    <div className="flex h-full flex-row justify-between md:relative md:flex-col">
     <div className="hidden p-2 text-base font-bold md:block md:text-center">
      {service.name}
     </div>

     <div className="relative min-w-[120px]">
      <img
       alt="Service image"
       src={service.image}
      />
      <div className="hidden p-2 text-center text-3xl font-bold text-primary md:block">
       {service.price} PLN
      </div>
      <Button
       onClick={handleLearnMore}
       className="absolute right-0 top-0 mr-2 mt-2 hidden h-min w-min p-[3px] md:flex"
      >
       <BiInfoCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
      </Button>
     </div>
     <div className="flex h-full w-full flex-col justify-between p-2 md:hidden">
      <div className="mb-4">{service.name}</div>
      <div className="text-2xl font-bold text-primary sm:text-3xl md:text-center">
       {service.price} PLN
      </div>
     </div>
     <Button
      onClick={handleLearnMore}
      className="right-0 top-0 mr-2 mt-2 h-min w-min p-[3px] md:hidden"
     >
      <BiInfoCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
     </Button>
    </div>
    <div className="flex flex-col items-center justify-center p-2 md:pt-0">
     <Button
      className="w-full whitespace-nowrap"
      onClick={onSelect}
     >
      Dodaj do koszyka
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
