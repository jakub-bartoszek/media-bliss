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
  <div className="w-full h-screen flex items-center gap-16 p-4">
   <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start">
    <h1 className="text-primary text-center md:text-left text-5xl md:text-6xl font-bold mb-4">
     Usługi {category}
    </h1>
    <p className="text-lg md:text-2xl mb-4 text-center md:text-left">
     Poszerz swoje zasięgi i zyskaj nową popularność, która pozwoli ci dotrzeć
     do niespotykanej dotąd ilości osób.
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
     service={
      services.filter((service) => service.name === "Pakiet Starter")[0]
     }
    />
    <ServicePackageTile
     className="w-[300px] h-[450px] absolute right-0 scale-[80%]"
     service={services.filter((service) => service.name === "Pakiet Pro")[0]}
    />
    <div className=" absolute bg-white w-full flex justify-center bg-opacity-40">
     <ServicePackageTile
      className="w-[300px] h-[450px]"
      service={services.filter((service) => service.name === "Pakiet High")[0]}
      onSelect={() =>
       handleProductSelect(
        services.filter((service) => service.name === "Pakiet High")[0]
       )
      }
     />
    </div>
   </div>
  </div>
 );
};

export default HeaderSection;
