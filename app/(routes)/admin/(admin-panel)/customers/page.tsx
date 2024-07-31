"use client";

import useCustomers from "@/lib/hooks/useCustomers";
import Loader from "@/components/loader";
import Error from "@/components/error";

const AdminCustomers = () => {
 const { customers, loading, error } = useCustomers();

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <div className="text-white w-full h-full min-h-screen flex items-center flex-col overflow-y-auto relative">
   {!loading && !customers.length ? (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono żadnych zamówień
    </h1>
   ) : (
    <div className="w-full p-6 mb-16">
     <h1 className="text-3xl font-bold mb-6 text-center">Klienci</h1>
     <div className="w-full flex flex-col gap-y-2">
      {customers.map((customer) => (
       <a
        className="flex px-4 py-2 bg-zinc-800 rounded-lg justify-between items-center gap-2"
        href={`/admin/customers/${customer.id}`}
        key={customer.id}
       >
        <div className="flex justify-between gap-4 overflow-hidden">
         <span className="text-zinc-500">{customer.id}</span>
         <span className="text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
          {customer.email}
         </span>
        </div>
        <span>{customer.name}</span>
        <span>{customer.orders.length}</span>
       </a>
      ))}
     </div>
    </div>
   )}
  </div>
 );
};

export default AdminCustomers;
