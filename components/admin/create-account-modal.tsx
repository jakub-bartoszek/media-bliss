import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../button";

interface CreateAccountModalProps {
 isOpen: boolean;
 onClose: () => void;
 onAccountAdded: () => void;
}

const CreateAccountModal = ({
 isOpen,
 onClose,
 onAccountAdded
}: CreateAccountModalProps) => {
 const [price, setPrice] = useState("");
 const [category, setCategory] = useState("");
 const [followsCount, setFollowsCount] = useState("");
 const [genderType, setGenderType] = useState("");
 const [genderPercentage, setGenderPercentage] = useState("");
 const [polishFollowersPercentage, setPolishFollowersPercentage] = useState("");
 const [age18to24Percentage, setAge18to24Percentage] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
   await axios.post(
    "/api/accounts",
    {
     price: parseFloat(price),
     category,
     followsCount: parseFloat(followsCount),
     genderType,
     genderPercentage: parseFloat(genderPercentage),
     polishFollowersPercentage: parseFloat(polishFollowersPercentage),
     age18to24Percentage: parseFloat(age18to24Percentage)
    },
    {
     headers: {
      "Content-Type": "application/json"
     }
    }
   );

   onAccountAdded();
   handleClose();
  } catch (error) {
   toast.error(`Coś poszło nie tak... ${error}`);
  } finally {
   setIsSubmitting(false);
   toast.success("Dodano pomyślnie!");
  }
 };

 const handleClose = () => {
  onClose();
  resetForm();
 };

 const resetForm = () => {
  setPrice("");
  setCategory("");
  setFollowsCount("");
  setGenderType("");
  setGenderPercentage("");
  setPolishFollowersPercentage("");
  setAge18to24Percentage("");
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
   <div className="bg-zinc-900 border-2 rounded-lg border-white/20 w-2/3 h-[90vh] flex flex-col">
    <h2 className="text-xl text-center font-bold border-b border-white/20 p-4">
     Utwórz konto
    </h2>
    <form
     className="flex flex-col gap-4 text-white flex-grow overflow-auto py-4 px-6"
     onSubmit={handleSubmit}
    >
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="price"
      >
       Cena
      </label>
      <input
       type="number"
       id="price"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="followsCount"
      >
       Ilość obserwujących
      </label>
      <input
       type="number"
       id="followsCount"
       value={followsCount}
       onChange={(e) => setFollowsCount(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="category"
      >
       Kategoria
      </label>
      <select
       id="category"
       value={category}
       onChange={(e) => setCategory(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      >
       <option value="">Wybierz kategorię</option>
       <option value="Instagram">Instagram</option>
       <option value="TikTok">TikTok</option>
      </select>
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="genderType"
      >
       Przeważająca płeć
      </label>
      <select
       id="genderType"
       value={genderType}
       onChange={(e) => setGenderType(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      >
       <option value="">Wybierz typ</option>
       <option value="Female">Kobiety</option>
       <option value="Male">Mężczyźni</option>
      </select>
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="genderPercentage"
      >
       % przeważającej płci
      </label>
      <input
       type="number"
       id="genderPercentage"
       value={genderPercentage}
       onChange={(e) => setGenderPercentage(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="genderPercentage"
      >
       % polaków
      </label>
      <input
       type="number"
       id="polishFollowersPercentage"
       value={polishFollowersPercentage}
       onChange={(e) => setPolishFollowersPercentage(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="genderPercentage"
      >
       % 18-24
      </label>
      <input
       type="number"
       id="age18to24Percentage"
       value={age18to24Percentage}
       onChange={(e) => setAge18to24Percentage(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div className="flex justify-end gap-4">
      <Button
       type="button"
       onClick={handleClose}
       className="bg-zinc-500"
      >
       Anuluj
      </Button>
      <Button
       type="submit"
       className="bg-green-500"
       disabled={isSubmitting}
      >
       {isSubmitting ? "Submitting..." : "Stwórz"}
      </Button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default CreateAccountModal;
