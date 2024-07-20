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
 const types = Array.from(
  new Set(services.map((service) => service.type))
 );

 const typeLabels: { [key: string]: string } = {
  Package: "Pakiety",
  Service: "Usługi",
  CustomService: "Niestandardowa usługi"
 };

 return (
  <div className="text-white w-full h-full flex flex-col overflow-y-scroll">
   {services.length === 0 ? (
    <h1 className="w-full text-center text-zinc-500 text-2xl mb-16">
     Nie znaleziono żadnych usług
    </h1>
   ) : (
    categories.map((category) => (
     <div
      key={category}
      className="mb-8 p-4"
     >
      <h1 className="font-bold text-4xl mb-6 px-4">{category}</h1>
      {types.map((type) => (
       <div
        key={type}
        className="mb-6"
       >
        <h2 className="text-3xl text-primary mb-4 font-bold px-4">
         {typeLabels[type]}
        </h2>
        {services
         .filter(
          (service) =>
           service.category === category && service.type === type
         )
         .map((service) => (
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
      ))}
     </div>
    ))
   )}

   <button
    className="py-3 px-6 font-bold ml-auto mr-auto bg-primary text-white rounded-lg transition hover:bg-primary-dark"
    onClick={() => setIsCreateModalOpen(true)}
   >
    Add New Service
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
