"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { CartItem, CustomerWithOrders } from "@/types";
import { Order } from "@prisma/client";
import Button from "../button";

const EditCustomerForm = ({ customer }: { customer: CustomerWithOrders }) => {
 const [formState, setFormState] = useState({
  name: customer.name,
  email: customer.email,
  phoneNumber: customer.phoneNumber
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
    toast.success("Zapisano pomyślnie!");
   }
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
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
     <h2 className="text-2xl font-bold mb-2">Imię</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="text"
      name="name"
      value={formState.name}
      onChange={handleChange}
      placeholder="Imię klienta"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Email</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="text"
      name="email"
      value={formState.email}
      onChange={handleChange}
      placeholder="Email klienta"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Numer telefonu</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="text"
      name="phoneNumber"
      value={formState.phoneNumber}
      onChange={handleChange}
      placeholder="Email klienta"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Zamówienia</h2>
     {customer.orders.map((order: Order, index) => (
      <a
       href={`/admin/orders/${order.id}`}
       key={index}
       className="flex flex-col rounded-lg bg-zinc-800 px-4 py-2 w-full mb-2"
      >
       <p className="text-xl font-bold">Zamówienie #{order.id}</p>
       <ul className="list-disc">
        {order.contents &&
         JSON.parse(order.contents).map((item: CartItem, index: number) => (
          <li
           className="ml-5"
           key={index}
          >
           {item.name}
          </li>
         ))}
       </ul>
      </a>
     ))}
    </div>
   </div>
  </div>
 );
};

export default EditCustomerForm;
