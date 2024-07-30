"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ServiceCategory, ServiceType } from "@prisma/client";
import { ServiceWithDecimalPrice } from "@/types";
import Button from "../button";
import { FaTrashCan } from "react-icons/fa6";

const EditServiceForm = ({ service }: { service: ServiceWithDecimalPrice }) => {
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

 const [newListItem, setNewListItem] = useState("");
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
    toast.success("Zapisano pomyślnie!");
   }
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
  }
 };

 const handleDelete = async () => {
  try {
   const response = await axios.delete(`/api/services/${service.id}`, {
    headers: {
     "Content-Type": "application/json"
    },
    data: { serviceId: service.id }
   });

   if (response.status === 200) {
    router.push("/admin/services");
    toast.success("Usunięto pomyślnie!");
   }
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
  }
 };

 const handleAddListItem = () => {
  if (newListItem.trim() !== "") {
   setFormState((prevState) => ({
    ...prevState,
    list: [...prevState.list, newListItem.trim()]
   }));
   setNewListItem("");
  }
 };

 const handleRemoveListItem = (index: number) => {
  setFormState((prevState) => ({
   ...prevState,
   list: prevState.list.filter((_, i) => i !== index)
  }));
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
     <h2 className="text-2xl font-bold mb-2">Nazwa</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="text"
      name="name"
      value={formState.name}
      onChange={handleChange}
      placeholder="Nazwa"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Cena</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="number"
      name="price"
      value={formState.price}
      onChange={handleChange}
      placeholder="Cena"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Opis</h2>
     <textarea
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      name="description"
      value={formState.description}
      onChange={handleChange}
      placeholder="Opis"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Lista</h2>
     <div className="flex gap-2 mb-4">
      <input
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       type="text"
       value={newListItem}
       onChange={(e) => setNewListItem(e.target.value)}
       placeholder="Dodaj"
      />
      <Button onClick={handleAddListItem}>Add</Button>
     </div>
     <ul>
      {formState.list.map((item, index) => (
       <li
        key={index}
        className="flex justify-between items-center mb-2 hover:bg-zinc-800 rounded-lg pl-2"
       >
        {item}
        <Button
         className="bg-rose-600 p-2"
         onClick={() => handleRemoveListItem(index)}
        >
         <FaTrashCan className="" />
        </Button>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Obraz</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
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
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
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
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
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
     <h2 className="text-2xl font-bold mb-2">Wymaga linku do konta</h2>
     <select
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
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
