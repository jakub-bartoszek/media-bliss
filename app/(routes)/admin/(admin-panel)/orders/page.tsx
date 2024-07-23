"use client";

import useOrders from "@/lib/hooks/useOrders";
import Loader from "@/components/loader";
import Error from "@/components/error";

const AdminOrders = () => {
 const { orders, loading, error } = useOrders();

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full flex items-center flex-col overflow-y-auto relative">
   {!loading && (!orders || orders.length === 0) ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="p-4 w-full">
     <h1 className="w-full  flex items-center justify-center text-3xl mb-4">
      Zamówienia
     </h1>
     {orders.map((order) => (
      <a
       href={`/admin/orders/${order.id}`}
       key={order.id}
       className="flex mb-2 w-full text-lg gap-4 hover:bg-zinc-800 px-4 py-2 rounded-lg transition"
      >
       <h2 className="text-lg font-bold">{order.id}</h2>
       <p>{order.email}</p>
       <p>{order.customerName}</p>
       <p>{order.status}</p>
      </a>
     ))}
    </div>
   )}
  </div>
 );
};

export default AdminOrders;
