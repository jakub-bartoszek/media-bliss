"use client";

import {
 FaBullhorn,
 FaFacebook,
 FaGoogle,
 FaTrafficLight,
 FaVideo,
 FaCamera,
 FaBusinessTime,
 FaImage,
 FaLaptopCode,
 FaReact,
 FaJs,
 FaWordpress
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

const services = [
 { name: "Reklama na Times Square", icon: FaBullhorn },
 { name: "Kampanie reklamowe Meta Ads", icon: FaFacebook },
 { name: "Opinie Google", icon: FaGoogle },
 {
  name: "Ruch na stronie internetowej Traffic WWW",
  icon: FaTrafficLight
 },
 { name: "Realizacja reklam", icon: FaVideo },
 { name: "Ogrywanie produktów", icon: FaVideo },
 { name: "Sesje zdjęciowe", icon: FaCamera },
 { name: "Wizytówki", icon: FaBusinessTime },
 { name: "Loga", icon: FaImage },
 { name: "Grafiki reklamowe", icon: FaImage },
 { name: "Projektowanie stron", icon: FaLaptopCode }
];

const webDevelopmentServices = [
 { name: "React", icon: FaReact },
 { name: "Next.js", icon: SiNextdotjs },
 { name: "JavaScript", icon: FaJs },
 { name: "TypeScript", icon: SiTypescript },
 { name: "Wordpress", icon: FaWordpress }
];

const ServiceCard = ({ name, Icon }: { name: string; Icon: any }) => (
 <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-4">
  <Icon className="text-primary text-3xl" />
  <span className="text-lg md:text-xl font-medium">{name}</span>
 </div>
);

const OtherServicesPage = () => {
 return (
  <div className="p-6 py-32 bg-zinc-50">
   <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-primary text-4xl md:text-6xl font-extrabold mb-8">
     Pozostałe usługi
    </h1>
    <p className="text-lg md:text-2xl mb-8 leading-relaxed">
     Nasza firma oferuje także zróżnicowane usługi poza mediami
     społecznościowymi, lecz z uwagi na ich indywidualną naturę, nie
     jesteśmy w stanie ujednolicić ceny. Jeśli jesteś zainteresowany/a
     owymi usługami, proszę skontaktować się z nami na drodze mailowej
     - <b>kontakt@mediabliss.pl</b>
    </p>
   </div>
   <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    {services.map((service, index) => (
     <ServiceCard
      key={index}
      name={service.name}
      Icon={service.icon}
     />
    ))}
   </div>
   <div className="max-w-4xl mx-auto mt-12">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">
     Tworzenie stron internetowych
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     {webDevelopmentServices.map((service, index) => (
      <ServiceCard
       key={index}
       name={service.name}
       Icon={service.icon}
      />
     ))}
    </div>
   </div>
  </div>
 );
};

export default OtherServicesPage;
