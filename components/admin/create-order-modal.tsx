import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../button";

interface CreateOrderModalProps {
 isOpen: boolean;
 onClose: () => void;
 onOrderAdded: () => void;
}

const CreateOrderModal = ({
 isOpen,
 onClose,
 onOrderAdded
}: CreateOrderModalProps) => {
 const [email, setEmail] = useState<string>("");
 const [status, setStatus] = useState<string>("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
   await axios.post(
    "/api/orders",
    {
     email,
     status
    },
    {
     headers: {
      "Content-Type": "application/json"
     }
    }
   );

   onOrderAdded();
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
  setEmail("");
  setStatus("");
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
   <div className="bg-zinc-900 border-2 rounded-lg border-white/20 w-2/3 h-[90vh] flex flex-col">
    <h2 className="text-xl text-center font-bold border-b border-white/20 p-4">
     Utwórz zamówienie
    </h2>
    <form
     className="flex flex-col gap-4 text-white flex-grow overflow-auto py-4 px-6"
     onSubmit={handleSubmit}
    >
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="email"
      >
       Email
      </label>
      <input
       type="text"
       id="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="status"
      >
       Kategoria
      </label>
      <select
       id="status"
       value={status}
       onChange={(e) => setStatus(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      >
       <option value="">Wybierz kategorię</option>
       <option value="Niezrealizowane">Niezrealizowane</option>
       <option value="Zrealizowane">Zrealizowane</option>
      </select>
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

export default CreateOrderModal;
