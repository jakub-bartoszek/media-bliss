import { fetchServices } from "@/lib/fetchServices";
import { ServiceWithDecimalPrice } from "@/types";

const AdminServices = async () => {
 const services: ServiceWithDecimalPrice[] = await fetchServices({});

 const categories = Array.from(
  new Set(services.map((service) => service.category))
 );

 return (
  <div className="text-white w-full h-full overflow-y-scroll">
   {services.length === 0 ? (
    <div>Nie znaleziono żadnych usług</div>
   ) : (
    categories.map((category) => (
     <div
      key={category}
      className="p-2"
     >
      <h1 className="text-4xl font-bold mb-2">{category}</h1>
      {services
       .filter((service) => service.category === category)
       .map((service) => (
        <a
         href={`/admin/services/${service.id}`}
         key={service.id}
         className="flex mb-2 text-lg gap-4 hover:bg-zinc-800 p-2 rounded-lg transition"
        >
         <span className="text-gray-400">{service.id}</span>
         <span>{service.name}</span>
         <span className="font-bold mr-0 ml-auto">
          {!service.price
           ? "Cena zależna od potrzeb klienta"
           : `${service.price.toString()} PLN`}
         </span>
        </a>
       ))}
     </div>
    ))
   )}
  </div>
 );
};

export default AdminServices;
