"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { GenderType, ServiceCategory, ServiceType } from "@prisma/client";
import { AccountWithDecimalPrice } from "@/types";
import Button from "../button";
import { FaTrashCan } from "react-icons/fa6";

const EditAccountForm = ({ account }: { account: AccountWithDecimalPrice }) => {
 const [formState, setFormState] = useState({
  category: account.category,
  price: account.price,
  followsCount: account.followsCount,
  genderType: account.genderType,
  genderPercentage: account.genderPercentage,
  polishFollowersPercentage: account.polishFollowersPercentage,
  age18to24Percentage: account.age18to24Percentage
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
    `/api/accounts/${account.id}`,
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
   const response = await axios.delete(`/api/accounts/${account.id}`, {
    headers: {
     "Content-Type": "application/json"
    },
    data: { accountId: account.id }
   });

   if (response.status === 200) {
    router.push("/admin/accounts");
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
     <h2 className="text-2xl font-bold mb-2">Ilość obserwujących</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="number"
      name="followsCount"
      value={formState.followsCount}
      onChange={handleChange}
      placeholder="Ilość obserwujących"
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
      <option
       key="Instagram"
       value="Instagram"
      >
       Instagram
      </option>
      <option
       key="TikTok"
       value="TikTok"
      >
       TikTok
      </option>
     </select>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">Przeważająca płeć</h2>
     <select
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      name="type"
      value={formState.genderType}
      onChange={handleChange}
     >
      <option
       key="Kobiety"
       value="Female"
      >
       Kobiety
      </option>
      <option
       key="Mężczyźni"
       value="Male"
      >
       Mężczyźni
      </option>
     </select>
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">% przeważającej płci</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="number"
      name="genderPercentage"
      value={formState.genderPercentage}
      onChange={handleChange}
      placeholder="0-100"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">% polaków</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="number"
      name="polishFollowersPercentage"
      value={formState.polishFollowersPercentage}
      onChange={handleChange}
      placeholder="0-100"
     />
    </div>
    <div>
     <h2 className="text-2xl font-bold mb-2">% 18-24</h2>
     <input
      className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
      type="number"
      name="age18to24Percentage"
      value={formState.age18to24Percentage}
      onChange={handleChange}
      placeholder="0-100"
     />
    </div>
   </div>
  </div>
 );
};

export default EditAccountForm;
