"use client";

import { useState } from "react";
import Loader from "@/components/loader";
import Error from "@/components/error";
import useCustomAccounts from "@/lib/hooks/useCustomAccounts";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CustomAccount } from "@prisma/client";

type EditedAccounts = {
 [key: number]: number;
};

const AdminAccounts = () => {
 const { customAccounts, loading, error } = useCustomAccounts();
 const router = useRouter();

 const [editedAccounts, setEditedAccounts] = useState<EditedAccounts>({});

 const handleInputChange = (id: number, value: number) => {
  setEditedAccounts({
   ...editedAccounts,
   [id]: value
  });
 };

 const handleSave = async () => {
  try {
   await Promise.all(
    Object.entries(editedAccounts).map(async ([id, pricePerFollow]) => {
     await fetch(`/api/custom-accounts/${id}`, {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify({ pricePerFollow })
     });
    })
   );
   setEditedAccounts({});
   toast.success("Zapisano pomyślnie!");
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
  }
 };

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

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
     <Button onClick={handleSave}>Zapisz</Button>
    </div>
   </div>
   <div>
    {customAccounts.map((account: CustomAccount) => (
     <div
      key={account.id}
      className="p-4 flex flex-col gap-2"
     >
      <h1 className="font-bold text-primary text-2xl">{account.category}</h1>
      <div className="flex gap-2 items-center">
       <input
       className="rounded-lg bg-zinc-800 px-4 py-2"
       type="number"
        value={
         editedAccounts[account.id] !== undefined
          ? editedAccounts[account.id].toString()
          : parseFloat(account.pricePerFollow.toString()).toString()
        }
        onChange={(e) =>
         handleInputChange(account.id, parseFloat(e.target.value))
        }
       />
       PLN / follow
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default AdminAccounts;
