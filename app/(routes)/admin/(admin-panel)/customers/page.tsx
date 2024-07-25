"use client";

import useCustomers from "@/lib/hooks/useCustomers";
import Loader from "@/components/loader";
import Error from "@/components/error";

const AdminCustomers = () => {
 const { customers, loading, error } = useCustomers();

 if (loading) return <Loader />;
 if (error) return <Error />;

 return (
  <div className="w-full h-full flex flex-col items-center bg-zinc-900 text-white overflow-y-auto">
   {!loading && (!customers || customers.length === 0) ? (
    <h1 className="flex items-center justify-center h-screen text-zinc-500 text-2xl">
     Nie znaleziono żadnych klientów
    </h1>
   ) : (
    <div className="w-full p-6">
     <h1 className="text-3xl font-bold mb-6 text-center">Klienci</h1>
     {customers.map((customer) => (
      <a
       href={`/admin/customers/${customer.id}`}
       key={customer.id}
       className="flex justify-between items-center p-4 mb-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 w-full"
      >
       <div className="flex gap-2 items-center">
        <p>{customer.id}</p>
        <p className="text-lg font-semibold text-zinc-200">
         {customer.email}
        </p>
       </div>
       {customer.orders && (
        <p className="text-sm text-zinc-400">
         {customer.orders.length}{" "}
        </p>
       )}
      </a>
     ))}
    </div>
   )}
  </div>
 );
};

export default AdminCustomers;
