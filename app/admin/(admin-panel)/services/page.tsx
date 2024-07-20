"use client";

import { useState, useEffect } from "react";
import ServiceCreateForm from "@/components/admin/create-service-modal";
import { ServiceWithDecimalPrice } from "@/types";
import { LuLoader2 } from "react-icons/lu";

const AdminServices = () => {
 const [services, setServices] = useState<ServiceWithDecimalPrice[]>(
  []
 );
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const fetchServices = async () => {
  try {
   setIsLoading(true);
   const response = await fetch("/api/services");
   const data = await response.json();
   setServices(data);
  } catch (error) {
   console.error("Failed to fetch services", error);
  } finally {
   setIsLoading(false);
  }
 };

 useEffect(() => {
  fetchServices();
 }, []);

 const handleAddService = async () => {
  await fetchServices();
  setIsCreateModalOpen(false);
 };

 const categories = Array.from(
  new Set(services.map((service) => service.category))
 );
 const types = Array.from(
  new Set(services.map((service) => service.type))
 );

 const typeLabels: { [key: string]: string } = {
  Package: "Pakiety",
  Service: "Usługi",
  CustomService: "Niestandardowa usługi"
 };

 return (
  <div className="text-white w-full h-full flex items-center flex-col overflow-y-auto">
   {isLoading ? (
    <div className="w-full h-full flex items-center justify-center">
     <LuLoader2 className="animate-spin text-5xl text-primary" />
    </div>
   ) : services.length === 0 ? (
    <h1 className="w-full text-center text-zinc-500 text-2xl mb-16">
     Nie znaleziono żadnych usług
    </h1>
   ) : (
    categories.map((category) => (
     <div
      key={category}
      className="mb-8 p-4 w-full"
     >
      <h1 className="font-bold text-4xl mb-6 px-4">{category}</h1>
      {types.map((type) => {
       const servicesOfType = services.filter(
        (service) =>
         service.category === category && service.type === type
       );

       return servicesOfType.length > 0 ? (
        <div
         key={type}
         className="mb-6"
        >
         <h2 className="text-3xl text-primary mb-4 font-bold px-4">
          {typeLabels[type]}
         </h2>
         {servicesOfType.map((service) => (
          <a
           href={`/admin/services/${service.id}`}
           key={service.id}
           className="flex mb-2 w-full text-lg gap-4 hover:bg-zinc-800 px-4 py-2 rounded-lg transition"
          >
           <span className="text-zinc-600 w-6 text-center hidden md:flex">
            {service.id}
           </span>
           <span className="font-bold overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow w-0">
            {service.name}
           </span>
           <span className="ml-auto mr-0 text-nowrap text-zinc-400">
            {!service.price
             ? "Cena zależna od potrzeb klienta"
             : `${service.price.toString()} PLN`}
           </span>
          </a>
         ))}
        </div>
       ) : null;
      })}
     </div>
    ))
   )}

   <button
    className="py-3 px-6 font-bold absolute bottom-8 bg-primary text-white rounded-lg transition hover:bg-primary-light shadow-lg"
    onClick={() => setIsCreateModalOpen(true)}
   >
    Dodaj usługę
   </button>

   {isCreateModalOpen && (
    <ServiceCreateForm
     isOpen={isCreateModalOpen}
     onClose={() => setIsCreateModalOpen(false)}
     onServiceAdded={handleAddService}
    />
   )}
  </div>
 );
};

export default AdminServices;
