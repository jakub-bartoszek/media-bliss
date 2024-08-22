"use client";

import { useState } from "react";
import CreatePackageModal from "@/components/admin/create-package-modal";
import usePackages from "@/lib/hooks/usePackages";
import Loader from "@/components/loader";
import Error from "@/components/error";
import Button from "@/components/button";

const AdminPackages = () => {
 const { packages, loading, error, refetch } = usePackages();
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 const handleAddPackage = async () => {
  refetch();
  setIsCreateModalOpen(false);
 };

 const categories = Array.from(new Set(packages.map((pkg) => pkg.category)));

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
     Nie znaleziono żadnych pakietów
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <h1 className="text-3xl font-bold mb-6 text-center">Pakiety</h1>
     {categories.map((category) => (
      <div
       className="mb-4"
       key={category}
      >
       <h1 className="text-3xl   font-bold mb-2">{category}</h1>
       <div className="w-full flex flex-col gap-y-2">
        {packages.map((pkg) => (
         <a
          className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
          href={`/admin/packages/${pkg.id}`}
          key={pkg.id}
         >
          <div className="flex justify-between gap-4 overflow-hidden">
           <span className="text-zinc-500 w-4">{pkg.id}</span>
           <span className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
            {pkg.name}
           </span>
          </div>
          <span className="text-nowrap">
           {!pkg.price
            ? "Cena zależna od potrzeb klienta"
            : `${pkg.price.toString()} PLN`}
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
    Dodaj pakiet
   </Button>
   {isCreateModalOpen && (
    <CreatePackageModal
     isOpen={isCreateModalOpen}
     onClose={() => setIsCreateModalOpen(false)}
     onPackageAdded={handleAddPackage}
    />
   )}
  </div>
 );
};

export default AdminPackages;
