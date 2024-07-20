"use client";

import { useState, useEffect } from "react";
import ServiceCreateForm from "@/components/create-service-modal";
import { ServiceWithDecimalPrice } from "@/types";

const AdminServices = () => {
 const [services, setServices] = useState<ServiceWithDecimalPrice[]>(
  []
 );
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 const fetchServices = async () => {
  try {
   const response = await fetch("/api/admin/services");
   const data = await response.json();
   setServices(data);
  } catch (error) {
   console.error("Failed to fetch services", error);
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

 return (
  <div className="text-white w-full h-full overflow-y-scroll">
   {services.length === 0 ? (
    <div>Nie znaleziono żadnych usług</div>
   ) : (
    categories.map((category) => (
     <div
      key={category}
      className="p-2 flex items-center justify-center flex-col"
     >
      <h1 className="text-4xl font-bold mb-2">{category}</h1>
      {services
       .filter((service) => service.category === category)
       .map((service) => (
        <a
         href={`/admin/services/${service.id}`}
         key={service.id}
         className="flex mb-2 w-full text-lg gap-4 hover:bg-zinc-800 p-2 rounded-lg transition"
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
      <button
       className="py-2 px-4 font-bold ml-auto mr-auto bg-primary rounded-lg"
       onClick={() => setIsCreateModalOpen(true)}
      >
       Add New Service
      </button>
     </div>
    ))
   )}

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
