import { useState } from "react";
import axios from "axios";
import Button from "../button";
import { FaTrashCan } from "react-icons/fa6";

interface CreateServiceModalProps {
 isOpen: boolean;
 onClose: () => void;
 onServiceAdded: () => void;
}

const CreateServiceModal = ({
 isOpen,
 onClose,
 onServiceAdded
}: CreateServiceModalProps) => {
 const [name, setName] = useState("");
 const [price, setPrice] = useState("");
 const [description, setDescription] = useState("");
 const [list, setList] = useState<string[]>([]);
 const [newListItem, setNewListItem] = useState("");
 const [image, setImage] = useState("");
 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [requireLink, setRequireLink] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
   await axios.post(
    "/api/services",
    {
     name,
     price: parseFloat(price),
     description,
     list,
     image,
     category,
     type,
     requireLink
    },
    {
     headers: {
      "Content-Type": "application/json"
     }
    }
   );

   onServiceAdded();
   handleClose();
  } catch (error) {
   console.error("Failed to create service", error);
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleClose = () => {
  onClose();
  resetForm();
 };

 const resetForm = () => {
  setName("");
  setPrice("");
  setDescription("");
  setList([]);
  setNewListItem("");
  setImage("");
  setCategory("");
  setType("");
  setRequireLink("");
 };

 const handleAddListItem = () => {
  if (newListItem.trim() !== "") {
   setList((prevList) => [...prevList, newListItem.trim()]);
   setNewListItem("");
  }
 };

 const handleRemoveListItem = (index: number) => {
  setList((prevList) => prevList.filter((_, i) => i !== index));
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
   <div className="bg-zinc-900 border-2 rounded-lg border-white/20 w-2/3 h-[90vh] flex flex-col">
    <h2 className="text-xl text-center font-bold border-b border-white/20 p-4">
     Utwórz usługę
    </h2>
    <form
     className="flex flex-col gap-4 text-white flex-grow overflow-auto py-4 px-6"
     onSubmit={handleSubmit}
    >
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="name"
      >
       Nazwa
      </label>
      <input
       type="text"
       id="name"
       value={name}
       onChange={(e) => setName(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      />
     </div>
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
       htmlFor="description"
      >
       Opis
      </label>
      <textarea
       id="description"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       rows={2}
      />
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="list"
      >
       Lista
      </label>
      <div className="flex gap-2">
       <input
        type="text"
        id="newListItem"
        value={newListItem}
        onChange={(e) => setNewListItem(e.target.value)}
        className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       />
       <Button
        type="button"
        onClick={handleAddListItem}
       >
        Add
       </Button>
      </div>
      <ul>
       {list.map((item, index) => (
        <li
         key={index}
         className="flex justify-between items-center mb-2 hover:bg-zinc-800 rounded-lg pl-2"
        >
         {item}
         <Button
          className="bg-rose-600 p-2"
          onClick={() => handleRemoveListItem(index)}
         >
          <FaTrashCan />
         </Button>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="image"
      >
       Grafika
      </label>
      <input
       type="text"
       id="image"
       value={image}
       onChange={(e) => setImage(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
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
       <option value="Others">Pozostałe</option>
      </select>
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="type"
      >
       Typ
      </label>
      <select
       id="type"
       value={type}
       onChange={(e) => setType(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      >
       <option value="">Wybierz typ</option>
       <option value="Package">Pakiet</option>
       <option value="Service">Usługa</option>
       <option value="CustomService">Niestandardowa usługa</option>
       <option value="Account">Konto</option>
      </select>
     </div>
     <div>
      <label
       className="block font-medium mb-1"
       htmlFor="requireLink"
      >
       Wymaga linku
      </label>
      <select
       id="requireLink"
       value={requireLink}
       onChange={(e) => setRequireLink(e.target.value)}
       className="rounded-lg bg-zinc-800 px-4 py-2 w-full"
       required
      >
       <option value="">Wybierz opcję</option>
       <option value="true">Tak</option>
       <option value="false">Nie</option>
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

export default CreateServiceModal;
