import { ServiceWithDecimalPrice } from "@/types";
import ServicePackageTile from "./service-package-tile";

const HeaderSection = ({
 category,
 scrollToFirstSection,
 services,
 handleProductSelect
}: {
 category: string;
 scrollToFirstSection: () => void;
 services: ServiceWithDecimalPrice[];
 handleProductSelect: (product: ServiceWithDecimalPrice) => void;
}) => {
 return (
  <div className="w-full h-[calc(100vh-64px)] flex items-center gap-16 p-8">
   <div className="w-full h-[calc(100vh-64px)] flex items-center gap-16 p-8">
    <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start">
     <h1 className="text-primary text-center md:text-left text-5xl md:text-6xl font-bold mb-4">
      Usługi {category}
     </h1>
     <p className="text-lg md:text-2xl mb-4 text-center md:text-left">
      Poszerz swoje zasięgi i zyskaj nową popularność, która pozwoli
      ci dotrzeć do niespotykanej dotąd ilości osób.
     </p>
     <button
      className="text-white bg-primary hover:bg-primary-light px-4 py-2 rounded-lg"
      onClick={scrollToFirstSection}
     >
      Poznaj naszą ofertę
     </button>
    </div>
    <div className="w-1/2 h-full relative hidden lg:flex items-center">
     <ServicePackageTile
      className="w-[300px] h-[450px] absolute left-0 scale-[80%]"
      key={services[0].id}
      name={services[0].name}
      list={services[0].list}
      price={services[0].price}
     />
     <ServicePackageTile
      className="w-[300px] h-[450px] absolute right-0 scale-[80%]"
      key={services[0].id}
      name={services[0].name}
      list={services[0].list}
      price={services[0].price}
     />
     <div className=" absolute bg-white w-full flex justify-center bg-opacity-40">
      <ServicePackageTile
       className="w-[300px] h-[450px]"
       key={services[3].id}
       name={services[3].name}
       list={services[3].list}
       price={services[3].price}
       onSelect={() => handleProductSelect(services[3])}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default HeaderSection;
