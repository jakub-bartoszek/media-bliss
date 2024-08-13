import Button from "@/components/button";
import CheckBox from "@/components/check-box";
import { CartItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { BiTrash } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface CartTileProps {
 item: CartItem;
 removeItemFromCart: (cartId: string) => void;
 cartItems: CartItem[];
 setCartItems: Dispatch<SetStateAction<CartItem[]>>;
 errors: {
  [key: string]: string;
 };
 setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const CartTile = ({
 item,
 removeItemFromCart,
 cartItems,
 setCartItems,
 errors,
 setErrors
}: CartTileProps) => {
 const updateAccountLink = (cartId: string, accountLink: string) => {
  const updatedCart = cartItems.map((i) =>
   i.cartId === cartId ? { ...i, accountLink } : i
  );
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("storage"));
 };

 const updateAdditionalInfo = (cartId: string, additionalInfo: string) => {
  const updatedCart = cartItems.map((i) =>
   i.cartId === cartId ? { ...i, additionalInfo } : i
  );
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("storage"));
 };

 const toggleItemSelected = (cartId: string) => {
  const updatedCart = cartItems.map((i) =>
   i.cartId === cartId ? { ...i, selected: !i.selected } : i
  );
  setCartItems(updatedCart);
 };

 const validateAccountLink = (
  cartId: string,
  accountLink: string,
  category: string
 ) => {
  const regex =
   category === "Instagram"
    ? /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)\.]+\/?$/
    : /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(_)\.]+\/?$/;

  const errorMessage =
   category === "Instagram"
    ? "Please enter a valid Instagram account link."
    : "Please enter a valid TikTok account link.";

  if (!regex.test(accountLink)) {
   setErrors((prev) => ({ ...prev, [cartId]: errorMessage }));
  } else {
   setErrors((prev) => {
    const { [cartId]: _, ...rest } = prev;
    return rest;
   });
  }
 };

 return (
  <div
   className={twMerge(
    "flex flex-col border rounded-lg",
    item.selected && "outline outline-primary"
   )}
  >
   <div className="flex">
    <div className="h-full pl-4 pt-5 pr-2">
     <CheckBox
      onClick={() => toggleItemSelected(item.cartId)}
      checked={item.selected}
     />
    </div>
    <div className="w-full py-4 pr-4">
     <div className="flex justify-between">
      <div className="mb-4 w-full">
       <h2 className="text-xl font-semibold">{item.name}</h2>
       <p className="text-sm text-zinc-500">{item.category}</p>
       <span className="text-lg font-semibold mr-4 text-primary">
        {Number(item.price).toFixed(2)} PLN
       </span>
      </div>
      <Button
       type="button"
       className="p-2 bg-rose-500 h-min"
       onClick={() => removeItemFromCart(item.cartId)}
      >
       <BiTrash className="w-5 h-5" />
      </Button>
     </div>
     {item.requireLink === "true" ? (
      <div className="flex flex-col gap-2 relative">
       {errors[item.cartId] && (
        <div className="text-red-500 text-xs mt-1 absolute top-[-20px]">
         {errors[item.cartId]}
        </div>
       )}
       <input
        required={item.selected}
        className={twMerge(
         "py-1 px-2 border border-zinc-300 rounded-md text-zinc-700 w-full",
         errors[item.cartId] && "outline-red-500 border-red-500"
        )}
        placeholder="Link do konta"
        value={item.accountLink || ""}
        onChange={(e) => {
         const newLink = e.target.value;
         updateAccountLink(item.cartId, newLink);
         validateAccountLink(item.cartId, newLink, item.category);
        }}
       />
       <textarea
        className="py-1 px-2 border border-zinc-300 rounded-md text-zinc-700 w-full"
        placeholder="Dodatkowe informacje (linki do postów, rolek itp.)"
        value={item.additionalInfo || ""}
        onChange={(e) => updateAdditionalInfo(item.cartId, e.target.value)}
       />
      </div>
     ) : (
      <div className="text-sm text-zinc-600">
       Produkt zostanie dostarczony na adres email
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default CartTile;
