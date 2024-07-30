"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CartItemWithAccountLink, OrderWithCustomer } from "@/types";
import Button from "../button";
import toast from "react-hot-toast";
import Link from "next/link";

const EditOrderForm = ({ order }: { order: OrderWithCustomer }) => {
 const [formState, setFormState] = useState({
  email: order.email,
  status: order.status
 });
 const [contents, setContents] = useState([]);
 const router = useRouter();

 useEffect(() => {
  if (order.contents) {
   try {
    const parsedContents = JSON.parse(order.contents);
    setContents(parsedContents);
   } catch (error) {
    console.error("Error parsing contents:", error);
   }
  }
 }, [order.contents]);

 const handleChange = (e: any) => {
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
    toast.success("Zapisano pomyślnie!");
   }
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
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
    toast.success("Usunięto pomyślnie!");
   }
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
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
     <h2 className="text-2xl font-bold mb-2">Status</h2>
     <select
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      name="status"
      value={formState.status}
      onChange={handleChange}
     >
      {Object.values(OrderStatus).map((status) => (
       <option
        key={status}
        value={status}
       >
        {status}
       </option>
      ))}
     </select>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Zawartość</h2>
     <div className="flex flex-col gap-2">
      {contents.map((item: CartItemWithAccountLink, index) => (
       <div
        key={index}
        className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       >
        <p className="text-xl font-bold">{item.name}</p>
        <p className="text-sm">{item.category}</p>
        <p>{item.price} PLN</p>
        {item.accountLink && (
         <p>
          <a
           href={item.accountLink}
           target="_blank"
           rel="noopener noreferrer"
           className="text-blue-500"
          >
           {item.accountLink}
          </a>
         </p>
        )}
       </div>
      ))}
     </div>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Klient</h2>
     <div className="rounded-lg bg-zinc-800 px-4 py-2 w-full">
      {order.Customer ? (
       <Link
        href={`/admin/customers/${order.Customer.id}`}
        className="text-blue-500"
       >
        {order.Customer.email}
       </Link>
      ) : (
       <p>Brak powiązanego klienta</p>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default EditOrderForm;
