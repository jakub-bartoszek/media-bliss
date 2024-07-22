"use client";

import { useState } from "react";
import axios from "axios";
import { ServiceCategory, ServiceType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ServiceWithDecimalPrice } from "@/types";

const EditServiceForm = ({
 service
}: {
 service: ServiceWithDecimalPrice;
}) => {
 const [formState, setFormState] = useState({
  name: service.name,
  price: service.price,
  description: service.description,
  list: service.list,
  image: service.image,
  category: service.category,
  type: service.type,
  requireLink: service.requireLink
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
    `/api/services/${service.id}`,
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
   console.error("Error saving service:", error);
  }
 };

 const handleDelete = async () => {
  try {
   const response = await axios.delete(
    `/api/services/${service.id}`,
    {
     headers: {
      "Content-Type": "application/json"
     },
     data: { serviceId: service.id }
    }
   );

   if (response.status === 200) {
    router.push("/admin/services");
   }
  } catch (error) {
   console.error("Error deleting service:", error);
  }
 };

 return (
  <div className="w-full h-full flex flex-col gap-4">
   <div className="flex items-center justify-between gap-4 border-b-2 border-white/20 p-4">
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
     <h2 className="text-2xl font-bold mb-2">Nazwa</h2>
     <input
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      type="text"
      name="name"
      value={formState.name}
      onChange={handleChange}
      placeholder="Name"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Cena</h2>
     <input
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      type="number"
      name="price"
      value={formState.price}
      onChange={handleChange}
      placeholder="Price"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Opis</h2>
     <textarea
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="description"
      value={formState.description}
      onChange={handleChange}
      placeholder="Description"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Lista</h2>
     <textarea
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="list"
      value={formState.list.join(", ")}
      onChange={(e) =>
       setFormState({
        ...formState,
        list: e.target.value.split(", ")
       })
      }
      placeholder="List (comma separated)"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Obraz</h2>
     <input
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      type="text"
      name="image"
      value={formState.image}
      onChange={handleChange}
      placeholder="Image URL"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Kategoria</h2>
     <select
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="category"
      value={formState.category}
      onChange={handleChange}
     >
      {Object.values(ServiceCategory).map((category) => (
       <option
        key={category}
        value={category}
       >
        {category}
       </option>
      ))}
     </select>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Typ</h2>
     <select
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="type"
      value={formState.type}
      onChange={handleChange}
     >
      {Object.values(ServiceType).map((type) => (
       <option
        key={type}
        value={type}
       >
        {type}
       </option>
      ))}
     </select>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">
      Wymaga linku do konta
     </h2>
     <select
      className="w-full bg-gray-800 p-2 rounded-lg text-lg"
      name="requireLink"
      value={formState.requireLink}
      onChange={handleChange}
     >
      <option value="true">Tak</option>
      <option value="false">Nie</option>
     </select>
    </div>
   </div>
  </div>
 );
};

export default EditServiceForm;
