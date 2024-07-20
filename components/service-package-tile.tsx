interface ServicePackageTileProps {
 name: string;
 price: number;
 list: string[];
 onSelect: () => void;
}

const ServicePackageTile = ({
 name,
 list,
 price,
 onSelect
}: ServicePackageTileProps) => {
 return (
  <div className="bg-white rounded-md border-2 w-full sm:w-[calc(33%-9px)] xl:w-[calc(20%-16px)] border-primary flex flex-col justify-between flex-shrink box-border">
   <div className="p-4">
    <div className="pb-4">
     <div className="text-xl font-bold">{name}</div>
     <div className="text-4xl font-bold text-primary">{price} PLN</div>
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
     className="bg-primary py-2 w-full text-white rounded-md hover:bg-primary/90 transition"
     onClick={onSelect}
    >
     Dodaj do koszyka
    </button>
   </div>
  </div>
 );
};

export default ServicePackageTile;
