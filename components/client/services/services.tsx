import { useRef, useState } from "react";
import { ServiceCategory } from "@prisma/client";
import { CartItem, ServiceWithDecimalPrice } from "@/types";
import { nanoid } from "nanoid";
import HeaderSection from "./header-section";
import ServiceSection from "./service-section";
import CustomServiceSection from "./custom-service-section";
import CartModal from "@/components/client/modals/cart-modal";
import AccountServiceSection from "./account-service-section";
import { trackPixelEvent } from "@/lib/utils/facebookPixel";

const Services = ({
 services,
 category
}: {
 services: ServiceWithDecimalPrice[];
 category: ServiceCategory;
}) => {
 const [isCartModalOpen, setIsCartModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
  useState<ServiceWithDecimalPrice | null>(null);
 const firstSectionRef = useRef<HTMLDivElement>(null);

 const handleProductSelect = (product: ServiceWithDecimalPrice) => {
  const uniqueProduct: CartItem = { ...product, cartId: nanoid() };

  setSelectedProduct(product);
  setIsCartModalOpen(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(uniqueProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));

  trackPixelEvent("AddToCart", {
   name: "Product",
   content: uniqueProduct
  });
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

 const accountService = services.find((service) => service.type === "Account");

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
      {accountService && (
       <AccountServiceSection
        service={accountService}
        setSelectedProduct={setSelectedProduct}
        setIsCartModalOpen={setIsCartModalOpen}
       />
      )}
      <CustomServiceSection
       services={customServices}
       setSelectedProduct={setSelectedProduct}
       setIsCartModalOpen={setIsCartModalOpen}
      />
     </div>
    </>
   )}

   {selectedProduct && (
    <CartModal
     isOpen={isCartModalOpen}
     onClose={() => setIsCartModalOpen(false)}
     selectedProduct={selectedProduct}
    />
   )}
  </div>
 );
};

export default Services;
