import ServiceOthersTile from "@/components/service-others-tile";
import ServicePackageTile from "@/components/service-package-tile";
import { services } from "@/services";
import { FaTiktok } from "react-icons/fa6";

const TikTokServices = () => {
 return (
  <div className="w-full h-full p-4 pt-32">
   <h1 className="w-full flex flex-col items-center text-5xl font-bold mb-8 gap-4">
    <FaTiktok className="w-24 h-24" />
    Usługi TikTok
   </h1>
   <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
    Pakiety
   </h2>
   <div className="flex flex-wrap justify-center gap-4 mb-16">
    {services.tiktok.packages.map((service) => (
     <ServicePackageTile
      key={service.id}
      name={service.name}
      list={service.list}
      price={service.price}
     />
    ))}
   </div>
   <h2 className="w-full text-center text-4xl font-bold mb-4 text-primary">
    Pozostałe
   </h2>
   <div className="flex flex-wrap justify-center gap-4 mb-16">
    {services.tiktok.others.map((service) => (
     <ServiceOthersTile
      key={service.id}
      name={service.name}
      image={service.image}
      price={service.price}
     />
    ))}
   </div>
  </div>
 );
};

export default TikTokServices;
