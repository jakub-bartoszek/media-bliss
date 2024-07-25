"use client";

import { useState } from "react";
import ServiceCreateForm from "@/components/admin/create-service-modal";
import useServices from "@/lib/hooks/useServices";
import Loader from "@/components/client/loader";
import Error from "@/components/client/error";

const AdminServices = () => {
 const { services, loading, error, refetch } = useServices();
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 const handleAddService = async () => {
  refetch();
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

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full flex items-center flex-col overflow-y-auto relative">
   {!loading && !categories.length ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych usług
    </h1>
   ) : (
    <>
     {categories.map((category) => (
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
     ))}
    </>
   )}
   <button
    className="py-3 px-6 font-bold sticky bottom-8 bg-primary text-white rounded-lg transition hover:bg-primary-light shadow-lg"
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
