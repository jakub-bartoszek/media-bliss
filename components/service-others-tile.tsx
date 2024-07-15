interface ServiceOthersTileProps {
 name: string;
 price: number;
 image: string;
 onSelect: () => void;
}

const ServiceOthersTile = ({
 name,
 image,
 price,
 onSelect
}: ServiceOthersTileProps) => {
 return (
  <div className="bg-white rounded-md border-2 w-[calc(50%-8px)] sm:w-[calc(33%-9px)] xl:w-[calc(16%-5px)] border-black/10 flex flex-col justify-between flex-shrink box-border">
   <div className="flex flex-col justify-between h-full">
    <div className="p-4 flex flex-col h-full justify-between">
     <div className="text-lg">{name}</div>
     <div className="text-3xl font-bold">{price} zł</div>
    </div>
    <div className="w-full">
     <img
      className="w-full"
      src={image}
     />
    </div>
   </div>
   <div className="flex items-center justify-center p-4">
    <button
     className="bg-primary py-2 w-full text-white rounded-md hover:bg-primary/90 transition"
     onClick={onSelect}
    >
     Wybierz
    </button>
   </div>
  </div>
 );
};

export default ServiceOthersTile;
