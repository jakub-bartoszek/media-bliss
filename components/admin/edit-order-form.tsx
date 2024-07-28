"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { OrderWithCustomer } from "@/types";
import Button from "../button";
import { twMerge } from "tailwind-merge";

const EditOrderForm = ({ order }: { order: OrderWithCustomer }) => {
 const [formState, setFormState] = useState({
  email: order.email,
  contents: order.contents,
  customerName: order.customerName,
  status: order.status,
  dateOfPurchase: new Date(order.dateOfPurchase)
 });

 const [parsedContents, setParsedContents] = useState<any[]>([]);
 const router = useRouter();

 useEffect(() => {
  try {
   const parsed = JSON.parse(order.contents);
   setParsedContents(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
   console.error("Error parsing contents:", error);
   setParsedContents([]);
  }
 }, [order.contents]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const { name, value } = e.target;
  setFormState((prevState) => ({
   ...prevState,
   [name]: value
  }));
 };

 const handleSave = async () => {
  try {
   const response = await axios.patch(`/api/orders/${order.id}`, formState, {
    headers: {
     "Content-Type": "application/json"
    }
   });

   if (response.status === 200) {
    router.refresh();
   }
  } catch (error) {
   console.error("Error saving order:", error);
  }
 };

 const handleDelete = async () => {
  try {
   const response = await axios.delete(`/api/orders/${order.id}`, {
    headers: {
     "Content-Type": "application/json"
    },
    data: { orderId: order.id }
   });

   if (response.status === 200) {
    router.push("/admin/orders");
   }
  } catch (error) {
   console.error("Error deleting order:", error);
  }
 };

 const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pl-PL", {
   day: "2-digit",
   month: "2-digit",
   year: "numeric",
   hour: "2-digit",
   minute: "2-digit",
   hour12: false
  }).format(date);
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
   <div className="flex flex-col gap-6 p-4">
    <div>
     <h2 className="text-2xl font-bold mb-2">Data zamówienia</h2>
     <p className="text-zinc-500">{formatDate(formState.dateOfPurchase)}</p>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Email</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2"
      type="email"
      name="email"
      value={formState.email}
      onChange={handleChange}
      placeholder="Email"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Usługi</h2>
     <div className="flex flex-col gap-2 w-full">
      {parsedContents.map((item, index) => (
       <div
        key={index}
        className="bg-zinc-800 p-4 rounded-lg"
       >
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-zinc-300">{item.price} PLN</p>
        {item.accountLink && (
         <p className="text-sm text-zinc-500">
          <a
           href={item.accountLink}
           target="_blank"
           rel="noopener noreferrer"
          >
           {item.accountLink}
          </a>
         </p>
        )}
       </div>
      ))}
     </div>
    </div>
    <div className="w-full">
     <h2 className="text-2xl font-bold mb-2">Klient</h2>
     <a
      className="flex w-full p-4 bg-zinc-800 hover:bg-zinc-600 transition rounded-lg"
      href={`/admin/customers/${order.customerId}`}
     >
      {formState.customerName}
     </a>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Status</h2>
     <select
      className={twMerge(
       "bg-zinc-800 rounded-lg py-2 px-4",
       formState.status === "Niezrealizowane"
        ? "text-rose-500"
        : "text-green-500"
      )}
      name="status"
      value={formState.status}
      onChange={handleChange}
     >
      {Object.values(OrderStatus).map((status) => (
       <option
        className={twMerge(
         status === "Niezrealizowane" ? "text-rose-500" : "text-green-500"
        )}
        key={status}
        value={status}
       >
        {status}
       </option>
      ))}
     </select>
    </div>
   </div>
  </div>
 );
};

export default EditOrderForm;
