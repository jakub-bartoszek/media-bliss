import ServicePackageTile from "@/components/services/service-package-tile";
import ServiceOthersTile from "@/components/services/service-others-tile";
import { ServiceWithDecimalPrice } from "@/types";

const ServiceSection = ({
 services,
 handleProductSelect
}: {
 services: ServiceWithDecimalPrice[];
 handleProductSelect: (product: ServiceWithDecimalPrice) => void;
}) => {
 return (
  <>
   {services.filter((service) => service.type === "Package")
    .length !== 0 && (
    <section>
     <h2 className="w-full text-center text-5xl font-bold mb-4 text-primary">
      Pakiety
     </h2>
     <div className="flex flex-wrap justify-center gap-4 mb-16">
      {services
       .filter((service) => service.type === "Package")
       .map((service) => (
        <ServicePackageTile
         key={service.id}
         service={service}
         onSelect={() => handleProductSelect(service)}
        />
       ))}
     </div>
    </section>
   )}
   {services.filter((service) => service.type === "Service")
    .length !== 0 && (
    <section>
     <h2 className="w-full text-center text-5xl font-bold mb-4 text-primary">
      Usługi
     </h2>
     <div className="flex flex-wrap justify-center gap-4 mb-16">
      {services
       .filter((service) => service.type === "Service")
       .map((service) => (
        <ServiceOthersTile
         key={service.id}
         service={service}
         onSelect={() => handleProductSelect(service)}
        />
       ))}
     </div>
    </section>
   )}
  </>
 );
};

export default ServiceSection;
