"use client";

import Error from "@/components/error";
import Loader from "@/components/loader";
import "react-circular-progressbar/dist/styles.css";
import useAccounts from "@/lib/hooks/useAccounts";
import AccountTile from "@/components/client/account-tile";
import CartModal from "@/components/client/modals/cart-modal";
import { useState } from "react";
import { CartItem, ServiceWithDecimalPrice } from "@/types";
import { nanoid } from "nanoid";
import { trackPixelEvent } from "@/lib/utils/facebookPixel";

const Accounts = () => {
 const { accounts, loading, error } = useAccounts();

 const [isCartModalOpen, setIsCartModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
  useState<ServiceWithDecimalPrice | null>(null);

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

 if (loading) return <Loader />;

 if (error) return <Error />;

 return (
  <div>
   <section className="w-full h-full min-h-screen p-4 pt-16 bg-gray-50">
    <h2 className="w-full text-center text-5xl font-bold mb-4 text-primary">
     Konta
    </h2>
    <div className="flex flex-wrap justify-center gap-4 mb-16">
     {accounts.map((account) => (
      <AccountTile
       key={account.id}
       account={account}
       onSelect={() =>
        handleProductSelect({
         id: account.id,
         name: `Konto ${account.category} × ${account.followsCount} obserwujących`,
         description: "",
         list: [""],
         image: "",
         price: account.price,
         category: account.category,
         type: "Account",
         requireLink: "false"
        })
       }
      />
     ))}
    </div>
   </section>
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

export default Accounts;
