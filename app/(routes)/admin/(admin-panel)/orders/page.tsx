"use client";

import { useState } from "react";
import CreateOrderModal from "@/components/admin/create-order-modal";
import useOrders from "@/lib/hooks/useOrders";
import Loader from "@/components/loader";
import Error from "@/components/error";
import Button from "@/components/button";

const AdminOrders = () => {
 const { orders, loading, error, refetch } = useOrders();
 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 const handleAddOrder = async () => {
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
   {!loading && !orders.length ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <div className="w-full flex flex-col gap-y-2">
      {orders.map((order) => (
       <a
        className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
        href={`/admin/orders/${order.id}`}
        key={order.id}
       >
        <div className="flex justify-between gap-4 overflow-hidden">
         <span className="text-zinc-500">{order.id}</span>
         <span className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
          {order.email}
         </span>
        </div>
        <span>{order.status}</span>
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
    <CreateOrderModal
     isOpen={isCreateModalOpen}
     onClose={() => setIsCreateModalOpen(false)}
     onOrderAdded={handleAddOrder}
    />
   )}
  </div>
 );
};

export default AdminOrders;
