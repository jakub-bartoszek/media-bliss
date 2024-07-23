"use client";

import useOrders from "@/lib/hooks/useOrders";
import Loader from "@/components/loader";
import Error from "@/components/error";

const AdminOrders = () => {
 const { orders, loading, error } = useOrders();

 if (loading) return <Loader />;
 if (error) return <Error />;

 return (
  <div className="w-full h-full flex flex-col items-center bg-zinc-900 text-white overflow-y-auto">
   {!loading && (!orders || orders.length === 0) ? (
    <h1 className="flex items-center justify-center h-screen text-gray-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="w-full max-w-6xl p-6">
     <h1 className="text-3xl font-bold mb-6 text-center">
      Zamówienia
     </h1>
     {orders.map((order) => (
      <a
       href={`/admin/orders/${order.id}`}
       key={order.id}
       className="flex justify-between items-center p-4 mb-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300"
      >
       <div className="flex items-center gap-4">
        <div className="flex items-center justify-center text-gray-300 text-xl font-bold">
         {order.id}
        </div>
        <div>
         <p className="text-lg font-semibold text-gray-200">
          {order.email}
         </p>
         <p className="text-sm text-gray-400">{order.customerName}</p>
        </div>
       </div>
       <p
        className={`text-lg font-medium ${
         order.status === "Niezrealizowane"
          ? "text-red-500"
          : "text-green-500"
        }`}
       >
        {order.status}
       </p>
      </a>
     ))}
    </div>
   )}
  </div>
 );
};

export default AdminOrders;
