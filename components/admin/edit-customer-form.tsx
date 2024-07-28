"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CustomerWithOrders } from "@/types";
import { Service } from "@prisma/client";
import Button from "../button";
import { twMerge } from "tailwind-merge";

const EditCustomerForm = ({ customer }: { customer: CustomerWithOrders }) => {
 const [formState, setFormState] = useState({
  email: customer.email,
  orders: customer.orders || []
 });

 const router = useRouter();
 const [parsedOrders, setParsedOrders] = useState<any[]>([]);

 useEffect(() => {
  if (customer.orders) {
   try {
    const parsed = customer.orders.map((order) => ({
     ...order,
     contents: JSON.parse(order.contents)
    }));
    setParsedOrders(parsed);
   } catch (error) {
    console.error("Error parsing order contents:", error);
    setParsedOrders([]);
   }
  } else {
   setParsedOrders([]);
  }
 }, [customer.orders]);

 const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormState((prevState) => ({
   ...prevState,
   [name]: value
  }));
 };

 const handleSave = async () => {
  try {
   const response = await axios.patch(
    `/api/customers/${customer.id}`,
    formState,
    {
     headers: {
      "Content-Type": "application/json"
     }
    }
   );

   if (response.status === 200) {
    router.refresh();
   }
  } catch (error) {
   console.error("Error saving customer:", error);
  }
 };

 const handleDelete = async () => {
  try {
   const response = await axios.delete(`/api/customers/${customer.id}`, {
    headers: {
     "Content-Type": "application/json"
    },
    data: { customerId: customer.id }
   });

   if (response.status === 200) {
    router.push("/admin/customers");
   }
  } catch (error) {
   console.error("Error deleting customer:", error);
  }
 };

 return (
  <div className="w-full h-full min-h-screen flex flex-col relative">
   <div className="sticky top-0 z-10 w-full h-14 flex items-center justify-between gap-4 border-b-2 border-white/20 p-4 bg-zinc-900">
    <Button
     className="bg-zinc-700"
     onClick={() => router.back()}
    >
     Powrót
    </Button>
    <div className="flex gap-4 items-center">
     <Button
      className="bg-rose-700"
      onClick={handleDelete}
     >
      Usuń
     </Button>
     <Button onClick={handleSave}>Zapisz</Button>
    </div>
   </div>
   <div className="flex flex-col gap-6 text-white p-4">
    <div>
     <h2 className="text-2xl font-bold mb-2">Email</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="text"
      name="email"
      value={formState.email}
      onChange={handleChange}
      placeholder="Email"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Zamówienia</h2>
     <div className="flex flex-col gap-6">
      {parsedOrders.map((item, index) => (
       <a
        href={`/admin/orders/${item.id}`}
        key={index}
        className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
       >
        {item.contents.map((service: Service) => (
         <p>{service.name}</p>
        ))}
        <p
         className={twMerge(
          item.status === "Niezrealizowane" ? "text-rose-500" : "text-green-500"
         )}
        >
         {item.status}
        </p>
       </a>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};

export default EditCustomerForm;
