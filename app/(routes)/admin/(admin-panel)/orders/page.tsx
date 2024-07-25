"use client";

import useOrders from "@/lib/hooks/useOrders";
import Loader from "@/components/loader";
import Error from "@/components/error";
import { twMerge } from "tailwind-merge";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const AdminOrders = () => {
 const { orders, loading, error } = useOrders();

 if (loading) return <Loader />;
 if (error) return <Error />;

 return (
  <div className="w-full h-full flex flex-col items-center bg-zinc-900 text-white overflow-y-auto">
   {!loading && (!orders || orders.length === 0) ? (
    <h1 className="flex items-center justify-center h-screen text-zinc-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="w-full p-6">
     <h1 className="text-3xl font-bold mb-6 text-center">Zamówienia</h1>
     {orders.map((order) => (
      <a
       href={`/admin/orders/${order.id}`}
       key={order.id}
       className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
      >
       <div className="flex justify-between gap-4">
        <span className="text-zinc-500">{order.id}</span>
        <span>{order.customerName}</span>
       </div>
       <span className="hidden md:flex text-zinc-500">{order.email}</span>
       <div
        className={twMerge(
         order.status === "Niezrealizowane" ? "text-red-500" : "text-green-500"
        )}
       >
        <span className="hidden md:flex">{order.status}</span>
        <span className="flex md:hidden">
         {order.status === "Niezrealizowane" ? <RxCross2 /> : <BiCheck />}
        </span>
       </div>
      </a>
     ))}
    </div>
   )}
  </div>
 );
};

export default AdminOrders;
