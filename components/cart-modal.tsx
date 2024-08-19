import { CartItem } from "@/types";
import Modal from "./modal";
import Button from "./button";

interface CartModalProps {
 isOpen: boolean;
 onClose: () => void;
 latestItem: CartItem | null;
 onViewCart: () => void;
}

const CartModal = ({
 isOpen,
 onClose,
 latestItem,
 onViewCart
}: CartModalProps) => {
 if (!isOpen || !latestItem) return null;

 return (
  <Modal
   title="Dodano do koszyka"
   onClose={onClose}
  >
   <div className="flex flex-col gap-4">
    <div className="border-2 p-4 w-full rounded-md">
     <div className="text-xl font-bold">{latestItem.name}</div>
     <div className="text-3xl font-bold  ">
      {latestItem.price} PLN
     </div>
    </div>
    <div className="flex gap-4 justify-between">
     <Button onClick={onViewCart}>Zobacz koszyk</Button>
     <Button
      className="     "
      onClick={onClose}
     >
      Kontynuuj zakupy
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default CartModal;
