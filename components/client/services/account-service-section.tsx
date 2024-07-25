import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { ServiceWithDecimalPrice, CartItem } from "@/types";
import Button from "@/components/button";

const AccountServiceSection = ({
 service,
 setSelectedProduct,
 setIsModalOpen
}: {
 service: ServiceWithDecimalPrice;
 setSelectedProduct: (product: CartItem) => void;
 setIsModalOpen: (isOpen: boolean) => void;
}) => {
 const [quantity, setQuantity] = useState<number>(0);
 const [accountPrice, setAccountPrice] = useState(0);

 const maxQuantity =
  service.category === "Instagram"
   ? 600000
   : service.category === "TikTok"
   ? 200000
   : 100000;

 const handleAddCustomService = useCallback(() => {
  if (!service) return;

  const accountProduct: CartItem = {
   ...service,
   cartId: nanoid(),
   name: `${service.name} ${quantity} Obserwujących`,
   price: accountPrice
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(accountProduct);
  localStorage.setItem("cart", JSON.stringify(cart));

  setSelectedProduct(accountProduct);
  setIsModalOpen(true);
 }, [service, quantity, accountPrice, setSelectedProduct, setIsModalOpen]);

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const qty = Math.min(parseInt(e.target.value), maxQuantity);
  setQuantity(qty);

  if (service) {
   setAccountPrice(qty * service.price);
  }
 };

 const handleQuantityBlur = () => {
  if (quantity < 100) {
   setQuantity(100);

   if (service) {
    setAccountPrice(100 * service.price);
   }
  }
 };

 return (
  <section className="flex flex-col md:flex-row justify-between gap-16 text-zinc-700 p-4 border-2 rounded-lg py-16">
   <div className="w-full md:w-2/3">
    <h2 className="w-full text-5xl text-center md:text-left font-bold mb-4 text-primary">
     Konto na zamówienie
    </h2>
    <p className="text-xl mb-8">
     Potrzebujesz konta o wybranej liczbie obserwacji? Zajmiemy się tym!
    </p>
    <p className="text-zinc-500 italic">
     Dostarczone konto nie będzie miało dokładnej ilości obserwujących jaką
     podałeś/aś.
    </p>
   </div>
   <div className="flex flex-col items-center p-4 rounded-lg border-2 justify-between border-black/10 w-full md:w-[300px] h-[300px]">
    <div className="w-full mb-16">
     <p className="w-full text-xl font-bold text-nowrap">Konto</p>
     <p className="w-full text-3xl font-bold">{accountPrice.toFixed(2)} PLN</p>
    </div>
    <div className="w-full">
     <input
      type="number"
      className="border-2 p-2 w-full mb-4 rounded-lg border-black/10"
      placeholder="Ilość obserwacji"
      value={quantity}
      onChange={handleQuantityChange}
      onBlur={handleQuantityBlur}
      min={100}
      max={maxQuantity}
     />
     <Button
      className="w-full"
      onClick={handleAddCustomService}
     >
      Dodaj do koszyka
     </Button>
    </div>
   </div>
  </section>
 );
};

export default AccountServiceSection;
