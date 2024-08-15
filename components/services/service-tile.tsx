import { useState } from "react";
import { Service } from "@prisma/client";
import { nanoid } from "nanoid";
import Button from "../button";
import { CartItem } from "@/types";
import { BiInfoCircle } from "react-icons/bi";
import ServiceInfoModal from "../service-info-modal";

interface ServiceTileProps {
 service: Service;
 onSelect: ({ name, category, price, requireLink }: CartItem) => void;
}

export const ServiceTile = ({ service, onSelect }: ServiceTileProps) => {
 const [isModalOpen, setModalOpen] = useState(false);

 const handleOpenModal = () => {
  setModalOpen(true);
 };

 const handleCloseModal = () => {
  setModalOpen(false);
 };

 return (
  <div className="box-border flex w-full flex-shrink flex-col justify-between overflow-hidden rounded-md border-2 bg-white md:min-w-[214px] md:basis-0">
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
      {parseFloat(service.price.toString())} PLN
     </div>
     <Button
      className="absolute right-0 top-0 mr-2 mt-2 hidden h-min w-min p-[3px] md:flex"
      onClick={handleOpenModal}
     >
      <BiInfoCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
     </Button>
    </div>
    <div className="flex h-full w-full flex-col justify-between p-2 md:hidden">
     <div className="mb-4">{service.name}</div>
     <div className="text-2xl font-bold text-primary sm:text-3xl md:text-center">
      {parseFloat(service.price.toString())} PLN
     </div>
    </div>
    <Button
     className="right-0 top-0 mr-2 mt-2 h-min w-min p-[3px] md:hidden"
     onClick={handleOpenModal}
    >
     <BiInfoCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
    </Button>
   </div>
   <div className="flex flex-col items-center justify-center p-2 md:pt-0">
    <Button
     className="w-full"
     onClick={() =>
      onSelect({
       id: nanoid(),
       name: service.name,
       category: service.category,
       price: parseFloat(service.price.toString()),
       requireLink: true
      })
     }
    >
     Dodaj do koszyka
    </Button>
   </div>

   <ServiceInfoModal
    service={service}
    isOpen={isModalOpen}
    onClose={handleCloseModal}
   />
  </div>
 );
};
