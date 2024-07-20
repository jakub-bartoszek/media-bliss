import { useState } from "react";

interface ServiceCreateFormProps {
 isOpen: boolean;
 onClose: () => void;
 onServiceAdded: () => void;
}

const ServiceCreateForm = ({
 isOpen,
 onClose,
 onServiceAdded
}: ServiceCreateFormProps) => {
 const [name, setName] = useState("");
 const [price, setPrice] = useState("");
 const [description, setDescription] = useState("");
 const [list, setList] = useState<string>("");
 const [image, setImage] = useState("");
 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return; // Prevent further submissions if already submitting

  setIsSubmitting(true); // Set loading state

  try {
   await fetch("/api/admin/services", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     name,
     price: parseFloat(price),
     description,
     list: list.split(",").map((item) => item.trim()),
     image,
     category,
     type
    })
   });
   onServiceAdded(); // Call callback to update the list
   onClose(); // Close the modal after successful submission
  } catch (error) {
   console.error("Failed to create service", error);
  } finally {
   setIsSubmitting(false); // Reset loading state
  }
 };

 const handleClose = () => {
  onClose();
  resetForm(); // Reset form state on close
 };

 const resetForm = () => {
  setName("");
  setPrice("");
  setDescription("");
  setList("");
  setImage("");
  setCategory("");
  setType("");
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
   <div className="bg-black border-2 rounded-lg p-6 border-white/20 w-1/2">
    <h2 className="text-xl font-bold mb-4">Create New Service</h2>
    <form
     className="flex flex-col gap-4 text-white"
     onSubmit={handleSubmit}
    >
     <div>
      <label
       className="text-xl"
       htmlFor="name"
      >
       Nazwa
      </label>
      <input
       type="text"
       id="name"
       value={name}
       onChange={(e) => setName(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       required
      />
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="price"
      >
       Cena
      </label>
      <input
       type="number"
       id="price"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       required
      />
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="description"
      >
       Opis
      </label>
      <textarea
       id="description"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       rows={4}
       required
      />
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="list"
      >
       Lista
      </label>
      <textarea
       id="list"
       placeholder="Wymieniaj po przecinku (1000 Polubień, 2000 Wyświetleń)"
       value={list}
       onChange={(e) => setList(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       rows={2}
      />
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="image"
      >
       Grafika
      </label>
      <input
       type="text"
       id="image"
       placeholder="URL"
       value={image}
       onChange={(e) => setImage(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
      />
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="category"
      >
       Kategoria
      </label>
      <select
       id="category"
       value={category}
       onChange={(e) => setCategory(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       required
      >
       <option value="">Select Category</option>
       <option value="Instagram">Instagram</option>
       <option value="TikTok">TikTok</option>
       <option value="Others">Pozostałe</option>
      </select>
     </div>
     <div>
      <label
       className="block text-sm font-medium mb-1"
       htmlFor="type"
      >
       Typ
      </label>
      <select
       id="type"
       value={type}
       onChange={(e) => setType(e.target.value)}
       className="w-full rounded-lg border-2 border-white/20 bg-black p-2"
       required
      >
       <option value="">Select Type</option>
       <option value="Package">Pakiet</option>
       <option value="Service">Usługa</option>
       <option value="CustomService">Niestandardowa usługa</option>
      </select>
     </div>
     <div className="flex justify-end">
      <button
       type="button"
       onClick={handleClose}
       className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
      >
       Anuluj
      </button>
      <button
       type="submit"
       className="px-4 py-2 bg-green-500 text-white rounded-lg"
       disabled={isSubmitting} // Disable button when submitting
      >
       {isSubmitting ? "Submitting..." : "Stwórz"}
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default ServiceCreateForm;
