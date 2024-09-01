"use client";

import { PackagesSection } from "@/components/packages/packages";
import { Services } from "@/components/services/services";
import { CustomServices } from "@/components/custom-services";
import { CustomAccountSection } from "@/components/custom-account";
import { AccountsForSale } from "@/components/accounts-for-sale/accounts-for-sale";
import { HeaderSection } from "@/components/header-section";
import CartModal from "@/components/cart-modal";
import { useAddToCart } from "@/lib/hooks/useAddToCart";

const AllServicesPage = () => {
 const {
  isCartModalOpen,
  latestItem,
  handleAddToCart,
  handleViewCart,
  closeModal
 } = useAddToCart();

 return (
  <div className="w-full flex flex-col gap-4">
   <HeaderSection
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />
   <PackagesSection
    id="instagram-packages"
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />
   <Services
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />
   <AccountsForSale
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />
   <CustomAccountSection
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />
   <CustomServices
    category="Instagram"
    handleAddToCart={handleAddToCart}
   />

   <HeaderSection
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <PackagesSection
    id="tiktok-packages"
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <Services
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <AccountsForSale
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <CustomAccountSection
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <CustomServices
    category="TikTok"
    handleAddToCart={handleAddToCart}
   />
   <CartModal
    isOpen={isCartModalOpen}
    onClose={closeModal}
    latestItem={latestItem}
    onViewCart={handleViewCart}
   />
  </div>
 );
};

export default AllServicesPage;
