import { ServiceWithDecimalPrice } from "@/types";

const CustomServiceSection = ({
 services,
 handleAddCustomService,
 setCustomServiceId,
 setCustomServiceName,
 setCustomServicePrice,
 setQuantity,
 customServiceId,
 customServiceName,
 customServicePrice,
 quantity,
 handleQuantityChange
}: {
 services: ServiceWithDecimalPrice[];
 handleAddCustomService: () => void;
 setCustomServiceId: (id: string) => void;
 setCustomServiceName: (name: string) => void;
 setCustomServicePrice: (price: number) => void;
 setQuantity: (quantity: number) => void;
 customServiceId: string;
 customServiceName: string;
 customServicePrice: number;
 quantity: number;
 handleQuantityChange: (
  e: React.ChangeEvent<HTMLInputElement>
 ) => void;
}) => {
 return (
  <section className="flex flex-col md:flex-row justify-between gap-16 items-center text-zinc-700">
   <div className="w-full md:w-2/3">
    <h2 className="w-full text-5xl text-center md:text-left font-bold mb-4 text-primary">
     Własna usługa
    </h2>
    <p className="text-lg mb-8">
     Pakiety nie spełniają twoich oczekiwań? Przygotowaliśmy dla
     ciebie możliwość dostosowania naszych usług do twoich potrzeb.
    </p>
    <select
     className="border-2 p-2 rounded-lg w-full"
     onChange={(e) => {
      setCustomServiceId(e.target.value);
      const selectedService = services.find(
       (service) => service.id.toString() === e.target.value
      );
      if (selectedService) {
       setCustomServiceName(selectedService.name);
       setCustomServicePrice(0);
       setQuantity(0);
      }
     }}
     value={customServiceId}
    >
     <option value="">Wybierz usługę</option>
     {services
      .filter((service) => service.type === "CustomService")
      .map((service) => (
       <option
        key={service.id}
        value={service.id}
       >
        {service.name}
       </option>
      ))}
    </select>
   </div>
   <div className="flex flex-col items-center p-4 rounded-lg border-2 justify-between border-black/10 w-full md:w-[300px] h-[300px]">
    <div className="w-full mb-16">
     <p className="w-full text-xl font-bold text-nowrap">
      {customServiceName ? customServiceName : "Twoja usługa"}
     </p>
     <p className="w-full text-3xl font-bold">
      {customServicePrice.toFixed(2)} PLN
     </p>
    </div>
    <div className="w-full">
     <input
      type="number"
      className="border-2 p-2 w-full mb-4 rounded-lg border-black/10"
      placeholder="Quantity"
      value={quantity}
      onChange={handleQuantityChange}
     />
     <button
      className="px-4 py-2 w-full bg-primary hover:bg-primary-light transition text-white rounded-lg"
      onClick={handleAddCustomService}
     >
      Dodaj do koszyka
     </button>
    </div>
   </div>
  </section>
 );
};

export default CustomServiceSection;
