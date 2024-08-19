"use client";

import { useState } from "react";
import CreateServiceModal from "@/components/admin/create-service-modal";
import useServices from "@/lib/hooks/useServices";
import Loader from "@/components/loader";
import Error from "@/components/error";
import Button from "@/components/button";

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

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full min-h-screen flex items-center flex-col overflow-y-auto relative">
   {!loading && !categories.length ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych usług
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <h1 className="text-3xl font-bold mb-6 text-center">Usługi</h1>
     {categories.map((category) => (
      <div
       className="mb-4"
       key={category}
      >
       <h1 className="text-3xl   font-bold mb-2">{category}</h1>
       <div className="w-full flex flex-col gap-y-2">
        {services.map((service) => (
         <a
          className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
          href={`/admin/services/${service.id}`}
          key={service.id}
         >
          <div className="flex justify-between gap-4 overflow-hidden">
           <span className="text-zinc-500">{service.id}</span>
           <span className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
            {service.name}
           </span>
          </div>
          <span className="text-nowrap">
           {!service.price
            ? "Cena zależna od potrzeb klienta"
            : `${service.price.toString()} PLN`}
          </span>
         </a>
        ))}
       </div>
      </div>
     ))}
    </div>
   )}
   <Button
    className="fixed bottom-8"
    onClick={() => setIsCreateModalOpen(true)}
   >
    Dodaj usługę
   </Button>
   {isCreateModalOpen && (
    <CreateServiceModal
     isOpen={isCreateModalOpen}
     onClose={() => setIsCreateModalOpen(false)}
     onServiceAdded={handleAddService}
    />
   )}
  </div>
 );
};

export default AdminServices;
