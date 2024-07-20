import { ServiceWithDecimalPrice } from "@/types";
import ServiceOthersTile from "./service-others-tile";

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

 const filteredList = selectedProduct.list.filter(
  (item) => item.trim() !== ""
 );

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white p-4 rounded-lg relative">
    <button
     onClick={onClose}
     className="absolute top-2 right-4 text-2xl"
    >
     &times;
    </button>
    <div className="mt-8 flex flex-col items-center gap-8">
     <h1 className="text-3xl font-bold whitespace-nowrap">
      Dodano do koszyka!
     </h1>
     <div className="max-w-[300px] border-2 rounded-lg border-primary p-4">
      <div className="border-b-2 pb-4">
       <p className="font-bold text-xl">{selectedProduct.name}</p>
       <p className="text-4xl font-bold text-primary">
        {selectedProduct.price} PLN
       </p>
      </div>
      {filteredList.length > 0 && (
       <ul className="list-disc marker:text-zinc-400 pl-4 mt-4">
        {filteredList.map((item, index) => (
         <li key={index}>{item}</li>
        ))}
       </ul>
      )}
      {selectedProduct.image && (
       <div className="mt-4">
        <img
         src={selectedProduct.image}
         alt={selectedProduct.name}
         className="w-full h-auto rounded-lg"
        />
       </div>
      )}
     </div>
     <div className="w-full flex gap-32">
      <button
       onClick={onClose}
       className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg text-nowrap"
      >
       Kontynuuj zakupy
      </button>
      <a
       href="/cart"
       className="w-full flex justify-center items-center px-4 py-2 bg-primary hover:bg-primary-light transition text-white rounded-lg"
      >
       Zobacz koszyk
      </a>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CartModal;
