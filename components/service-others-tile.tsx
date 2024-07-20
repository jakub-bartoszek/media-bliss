import { ServiceWithDecimalPrice } from "@/types";

interface ServiceOthersTileProps {
 service: ServiceWithDecimalPrice;
 onSelect: () => void;
}

const ServiceOthersTile = ({
 service,
 onSelect
}: ServiceOthersTileProps) => {
 return (
  <div className="bg-white rounded-md border-2 border-black/10 flex flex-col justify-between flex-shrink box-border overflow-hidden w-full md:w-[200px]">
   <div className="flex flex-row-reverse md:flex-col justify-between h-full border-b-2">
    <div className="p-2 flex flex-col h-full w-full justify-between gap-4">
     <div className="font-bold text-xl">{service.name}</div>
     <div className="text-4xl font-bold text-primary">
      {service.price} PLN
     </div>
    </div>
    <img
     className="h-[200px] md:w-full md:h-auto"
     src={service.image}
    />
   </div>
   <div className="flex items-center justify-center p-4">
    <button
     className="bg-primary py-2 w-full text-white rounded-md hover:bg-primary-light transition"
     onClick={onSelect}
    >
     Dodaj do koszyka
    </button>
   </div>
  </div>
 );
};

export default ServiceOthersTile;
