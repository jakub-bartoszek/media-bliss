import { useRef, useState } from "react";
import HeaderSection from "./header-section";
import ServiceSection from "./service-section";
import CustomServiceSection from "./custom-service-section";
import CartModal from "@/components/cart-modal";
import { ServiceCategory } from "@prisma/client";
import { nanoid } from "nanoid";
import { CartItem, ServiceWithDecimalPrice } from "@/types";

const Services = ({
 services,
 category
}: {
 services: ServiceWithDecimalPrice[];
 category: ServiceCategory;
}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
  useState<ServiceWithDecimalPrice | null>(null);
 const firstSectionRef = useRef<HTMLDivElement>(null);

 const handleProductSelect = (product: ServiceWithDecimalPrice) => {
  const uniqueProduct: CartItem = {
   ...product,
   cartId: nanoid()
  };

  setSelectedProduct(product);
  setIsModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(uniqueProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
 };

 const scrollToFirstSection = () => {
  if (firstSectionRef.current) {
   const offset = 64;
   const elementPosition =
    firstSectionRef.current.getBoundingClientRect().top;
   const offsetPosition = elementPosition + window.scrollY - offset;

   window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
   });
  }
 };

 return (
  <div className="w-full h-full p-4 pt-16 mb-16">
   {services.length !== 0 && (
    <>
     <HeaderSection
      services={services}
      category={category}
      scrollToFirstSection={scrollToFirstSection}
      handleProductSelect={handleProductSelect}
     />
     <div ref={firstSectionRef}>
      <ServiceSection
       services={services}
       handleProductSelect={handleProductSelect}
      />
      <CustomServiceSection
       services={services}
       setSelectedProduct={setSelectedProduct}
       setIsModalOpen={setIsModalOpen}
      />
     </div>
    </>
   )}

   {selectedProduct && (
    <CartModal
     isOpen={isModalOpen}
     onClose={() => setIsModalOpen(false)}
     selectedProduct={selectedProduct}
    />
   )}
  </div>
 );
};

export default Services;
