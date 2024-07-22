import { twMerge } from "tailwind-merge";

interface ServicePackageTileProps {
 name: string;
 price: number;
 list: string[];
 className?: string;
 onSelect?: () => void;
}

const ServicePackageTile = ({
 name,
 list,
 price,
 className,
 onSelect
}: ServicePackageTileProps) => {
 return (
  <div
   className={twMerge(
    "bg-white rounded-md border-2 w-full md:min-w-[260px] md:basis-0 border-primary flex flex-col justify-between flex-shrink box-border relative overflow-hidden",
    className
   )}
  >
   {name === "Pakiet High" && (
    <div className="absolute top-4 -right-8 rotate-45 bg-primary text-white py-1 px-8 text-xs w-fit">
     Bestseller
    </div>
   )}
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{name}</div>
     <div className="text-4xl font-bold text-primary">
      {price} PLN
     </div>
    </div>
    <div className="border-t-2 pt-4">
     <ul className="list-disc marker:text-zinc-400 pl-4">
      {list.map((item, index) => (
       <li key={index}>{item}</li>
      ))}
     </ul>
    </div>
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

export default ServicePackageTile;
