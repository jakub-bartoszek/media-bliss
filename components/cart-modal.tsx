import { Service } from "@prisma/client";

interface CartModalProps {
 isOpen: boolean;
 onClose: () => void;
 selectedProduct: Service;
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
       <ul className="list-disc marker:text-primary pl-4">
        {selectedProduct.list.map((item, index) => (
         <li key={index}>{item}</li>
        ))}
       </ul>
      )}
      <p className="text-3xl font-bold text-center">
       {selectedProduct.price} zł
      </p>
     </div>
     <div className="w-full flex justify-between gap-24">
      <button
       onClick={onClose}
       className="py-2 px-4 bg-primary text-white rounded-lg whitespace-nowrap"
      >
       Kontynuuj zakupy
      </button>
      <a
       href="/cart"
       className="py-2 px-4 bg-primary text-white rounded-lg"
      >
       Koszyk
      </a>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CartModal;
