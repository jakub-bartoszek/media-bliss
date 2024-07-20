import { ServiceWithDecimalPrice } from "@/types";

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

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white p-4 rounded-lg relative">
    <div className="absolute top-2 right-4">
     <button
      onClick={onClose}
      className="text-2xl"
     >
      &times;
     </button>
    </div>
    <div className="mt-8 flex flex-col items-center gap-8">
     <h1 className="text-3xl font-bold whitespace-nowrap">
      Dodano do koszyka!
     </h1>
     <div className="border-2 rounded-lg p-4 flex flex-col gap-4">
      <p className="text-xl text-center">{selectedProduct.name}</p>
      {selectedProduct.image && (
       <img
        className="w-full"
        src={selectedProduct.image}
       />
      )}
      {selectedProduct.list && (
       <ul className="list-disc text-lg">
        {selectedProduct.list.map((item, index) => (
         <li key={index}>{item}</li>
        ))}
       </ul>
      )}
      <p className="text-lg text-center">
       Cena: {selectedProduct.price} PLN
      </p>
     </div>
     <div className="w-full flex gap-4">
      <button
       onClick={onClose}
       className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg"
      >
       Kontynuuj zakupy
      </button>
      <a
       href="/cart"
       className="w-full flex justify-center items-center px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg"
      >
       <button className="w-full h-full">Zobacz koszyk</button>
      </a>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CartModal;
