import { useRef, useState } from "react";
import HeaderSection from "./header-section";
import ServiceSection from "./service-section";
import CustomServiceSection from "./custom-service-section";
import CartModal from "@/components/client/modals/cart-modal";
import { ServiceCategory } from "@prisma/client";
import { nanoid } from "nanoid";
import { CartItem, ServiceWithDecimalPrice } from "@/types";
import AccountServiceSection from "./account-service-section";

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
  const uniqueProduct: CartItem = { ...product, cartId: nanoid() };

  setSelectedProduct(product);
  setIsModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(uniqueProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));
 };

 const scrollToFirstSection = () => {
  if (firstSectionRef.current) {
   const offset = 64;
   const elementPosition = firstSectionRef.current.getBoundingClientRect().top;
   const offsetPosition = elementPosition + window.scrollY - offset;

   window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
 };

 const customServices = services.filter(
  (service) => service.type === "CustomService"
 );

 const accountService = services.filter(
  (service) => service.type === "Account"
 )[0];

 return (
  <div className="w-full h-full p-4">
   {services.length !== 0 && (
    <>
     <HeaderSection
      services={services}
      category={category}
      scrollToFirstSection={scrollToFirstSection}
      handleProductSelect={handleProductSelect}
     />
     <div
      className="flex flex-col gap-16"
      ref={firstSectionRef}
     >
      <ServiceSection
       services={services}
       handleProductSelect={handleProductSelect}
      />
      <AccountServiceSection
       service={accountService}
       setSelectedProduct={setSelectedProduct}
       setIsModalOpen={setIsModalOpen}
      />
      <CustomServiceSection
       services={customServices}
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
