"use client";

import axios from "axios";
import { twMerge } from "tailwind-merge";
import useOrders from "@/lib/hooks/useOrders";
import Loader from "@/components/loader";
import Error from "@/components/error";

const AdminOrders = () => {
 const { orders, loading, error, refetch } = useOrders();

 const handleDeleteOrder = async (orderId: number) => {
  try {
   await axios.delete(`/api/orders/${orderId}`);
   refetch();
  } catch (error) {
   console.error("Error deleting order:", error);
  }
 };

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full min-h-screen flex items-center flex-col overflow-y-auto relative">
   {!loading && !orders ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <h1 className="text-3xl font-bold mb-6 text-center">Zamówienia</h1>
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
        <span
         className={twMerge(
          "text-nowrap",
          order.status === "Niezrealizowane"
           ? "text-rose-500"
           : "text-green-400"
         )}
        >
         {order.status}
        </span>
        <button
         onClick={() => handleDeleteOrder(order.id)}
         className="ml-4 text-red-500"
        >
         Delete
        </button>
       </a>
      ))}
     </div>
    </div>
   )}
  </div>
 );
};

export default AdminOrders;
