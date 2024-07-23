"use client";

import { useState } from "react";
import axios from "axios";
import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { OrderWithCustomer } from "@/types";

const EditOrderForm = ({ order }: { order: OrderWithCustomer }) => {
 const [formState, setFormState] = useState({
  email: order.email,
  contents: order.contents,
  customerName: order.customerName,
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
   const response = await axios.patch(
    `/api/orders/${order.id}`,
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

 return (
  <div className="w-full h-full min-h-screen flex flex-col relative">
   <div className="sticky top-0 z-10 w-full h-14 flex items-center justify-between gap-4 border-b-2 border-white/20 p-4 bg-zinc-900">
    <button
     className="text-white py-2 px-4 rounded-full bg-gray-700 hover:bg-gray-500 font-bold"
     onClick={() => router.back()}
    >
     Powrót
    </button>
    <div className="flex gap-4 items-center">
     <button
      className="text-white py-2 px-4 rounded-full bg-rose-700 hover:bg-rose-600 font-bold"
      onClick={handleDelete}
     >
      Usuń
     </button>
     <button
      className="text-white py-2 px-4 rounded-full bg-indigo-700 hover:bg-indigo-600 font-bold"
      onClick={handleSave}
     >
      Zapisz
     </button>
    </div>
   </div>
   <div className="flex flex-col gap-6 text-white p-4">
    <div>
     <h2 className="text-2xl font-bold mb-2">Email</h2>
     <input
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      type="email"
      name="email"
      value={formState.email}
      onChange={handleChange}
      placeholder="Email"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Contents</h2>
     <textarea
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="contents"
      value={formState.contents}
      onChange={handleChange}
      placeholder="Contents"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Customer Name</h2>
     <input
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      type="text"
      name="customerName"
      value={formState.customerName}
      onChange={handleChange}
      placeholder="Customer Name"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Status</h2>
     <select
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
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
   </div>
  </div>
 );
};

export default EditOrderForm;
