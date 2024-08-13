"use client";

import useAccounts from "@/lib/hooks/useAccounts";
import Loader from "@/components/loader";
import Error from "@/components/error";
import Button from "@/components/button";
import CreateAccountModal from "@/components/admin/create-account-modal";
import { useState } from "react";

const AdminAccounts = () => {
 const { accounts, loading, error, refetch } = useAccounts();

 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 const handleAddService = async () => {
  refetch();
  setIsCreateModalOpen(false);
 };

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full min-h-screen flex items-center flex-col overflow-y-auto relative">
   {!loading && !accounts.length ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych kont
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <h1 className="text-3xl font-bold mb-6 text-center">Konta</h1>

     <div className="w-full flex flex-col gap-y-2">
      {accounts.map((account) => (
       <a
        className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
        href={`/admin/accounts/${account.id}`}
        key={account.id}
       >
        <div className="flex justify-between gap-4 overflow-hidden">
         <span className="text-zinc-500 w-4">{account.id}</span>
         <span>{`Konto ${account.category} × ${account.followsCount} obserwujących`}</span>
        </div>
        <span>{account.price} PLN</span>
       </a>
      ))}
     </div>
    </div>
   )}
   <Button
    className="fixed bottom-8"
    onClick={() => setIsCreateModalOpen(true)}
   >
    Dodaj usługę
   </Button>
   {isCreateModalOpen && (
    <CreateAccountModal
     isOpen={isCreateModalOpen}
     onClose={() => setIsCreateModalOpen(false)}
     onAccountAdded={handleAddService}
    />
   )}
  </div>
 );
};

export default AdminAccounts;
