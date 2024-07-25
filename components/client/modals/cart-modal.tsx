import { ServiceWithDecimalPrice } from "@/types";
import Modal from "./modal";
import Button from "@/components/button";

interface CartModalProps {
 isOpen: boolean;
 onClose: () => void;
 selectedProduct: ServiceWithDecimalPrice;
}

const CartModal: React.FC<CartModalProps> = ({
 isOpen,
 onClose,
 selectedProduct
}) => {
 if (!isOpen) return null;

 const filteredList = selectedProduct.list.filter((item) => item.trim() !== "");

 return (
  <Modal
   title="Dodano do koszyka!"
   onClose={onClose}
  >
   <div className="max-w-[300px] border-2 border-primary rounded-lg p-4">
    <div>
     <p className="text-xl font-bold">{selectedProduct.name}</p>
     <p className="text-4xl font-bold text-primary">
      {selectedProduct.price} PLN
     </p>
    </div>
    {filteredList.length > 0 && (
     <ul className="list-disc pl-4 pt-4 marker:text-zinc-400">
      {filteredList.map((item, index) => (
       <li key={index}>{item}</li>
      ))}
     </ul>
    )}
    {selectedProduct.image && (
     <div className="mt-4">
      <img
       src={selectedProduct.image}
       alt={`Image of ${selectedProduct.name}`}
       className="w-full h-auto rounded-lg"
      />
     </div>
    )}
   </div>
   <div className="flex gap-4 mt-4">
    <Button onClick={onClose}>Kontynuuj zakupy</Button>
    <a href="/cart">
     <Button>Zobacz koszyk</Button>
    </a>
   </div>
  </Modal>
 );
};

export default CartModal;
