"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Order, OrderStatus } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../button";
import { FaTrashCan } from "react-icons/fa6";

const EditOrderForm = ({ order }: { order: Order }) => {
 const [formState, setFormState] = useState({
  id: order.id,
  email: order.email,
  status: order.status
 });

 const router = useRouter();

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
     <h2 className="text-2xl font-bold mb-2">Kategoria</h2>
     <select
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      name="category"
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
   </div>
  </div>
 );
};

export default EditOrderForm;
