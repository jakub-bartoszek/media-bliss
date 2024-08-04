import React from "react";
import { ServiceWithDecimalPrice } from "@/types";
import Modal from "./modal";
import Button from "@/components/button";

interface CartModalProps {
 isOpen: boolean;
 onClose: () => void;
 selectedProduct: ServiceWithDecimalPrice;
}

// Individual product type components
const PackageProduct: React.FC<{ product: ServiceWithDecimalPrice }> = ({
 product
}) => (
 <div className="box-border flex w-4/5 flex-col justify-between rounded-lg border-2 border-primary sm:max-w-[300px]">
  <div className="p-4">
   <div className="pb-4">
    <div className="text-lg md:text-xl font-bold">{product.name}</div>
    <div className="text-3xl md:text-4xl font-bold text-primary">
     {product.price} PLN
    </div>
   </div>
   <div className="border-t-2 pt-4">
    <ul className="list-disc marker:text-zinc-400 pl-4 text-sm md:text-base">
     {product.list.map((item, index) => (
      <li key={index}>{item}</li>
     ))}
    </ul>
   </div>
  </div>
 </div>
);

const ServiceProduct: React.FC<{ product: ServiceWithDecimalPrice }> = ({
 product
}) => (
 <div className="w-4/5 sm:max-w-[300px] overflow-hidden rounded-lg border-2">
  <div className="p-4">
   <div className="text-lg md:text-xl font-bold mb-2">{product.name}</div>
   <div className="text-3xl md:text-4xl font-bold text-primary">
    {product.price} PLN
   </div>
  </div>
  <div className="flex items-center justify-center">
   <img
    src={product.image}
    alt={`Image of ${product.name}`}
    className="h-auto max-w-full"
   />
  </div>
 </div>
);

const CustomServiceProduct: React.FC<{ product: ServiceWithDecimalPrice }> = ({
 product
}) => (
 <div className="w-full overflow-hidden rounded-lg border-2">
  <div className="p-2 sm:p-4">
   <p className="text-lg sm:text-xl font-bold">{product.name}</p>
   <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold text-primary">
    {product.price} PLN
   </p>
  </div>
 </div>
);

const AccountProduct: React.FC<{ product: ServiceWithDecimalPrice }> = ({
 product
}) => (
 <div className="w-full overflow-hidden rounded-lg border-2">
  <div className="p-2 sm:p-4">
   <p className="text-lg sm:text-xl font-bold">{product.name}</p>
   <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold text-primary">
    {product.price} PLN
   </p>
  </div>
 </div>
);

const renderProduct = (selectedProduct: ServiceWithDecimalPrice) => {
 switch (selectedProduct.type) {
  case "Package":
   return <PackageProduct product={selectedProduct} />;
  case "Service":
   return <ServiceProduct product={selectedProduct} />;
  case "CustomService":
   return <CustomServiceProduct product={selectedProduct} />;
  case "Account":
   return <AccountProduct product={selectedProduct} />;
  default:
   return null;
 }
};

const CartModal: React.FC<CartModalProps> = ({
 isOpen,
 onClose,
 selectedProduct
}) => {
 if (!isOpen) return null;

 return (
  <Modal
   title="Dodano do koszyka!"
   onClose={onClose}
  >
   {renderProduct(selectedProduct)}
   <div className="mt-4 flex w-full flex-col justify-center gap-2 whitespace-nowrap sm:mt-6 sm:flex-row sm:gap-x-4">
    <Button
     className="w-full bg-white font-semibold text-primary outline outline-2 outline-offset-[-2px] outline-primary"
     onClick={onClose}
    >
     Kontynuuj zakupy
    </Button>
    <a
     href="/cart"
     className="w-full"
    >
     <Button className="w-full">Zobacz koszyk</Button>
    </a>
   </div>
  </Modal>
 );
};

export default CartModal;
