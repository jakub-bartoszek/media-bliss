"use client";

import { useEffect, useState } from "react";
import { Service } from "@prisma/client";

interface CartItem extends Service {
 cartId: string;
}

const Cart = () => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCartItems(storedCart);
 }, []);

 const removeItemFromCart = (cartId: string) => {
  const updatedCart = cartItems.filter(
   (item) => item.cartId !== cartId
  );
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
 };

 return (
  <div className="w-full h-full p-4">
   <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
   {cartItems.length > 0 ? (
    <div className="flex flex-col gap-4">
     {cartItems.map((item) => (
      <div
       key={item.cartId}
       className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-white"
      >
       <div>
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-lg text-gray-500">${item.price}</p>
       </div>
       <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => removeItemFromCart(item.cartId)}
       >
        Remove
       </button>
      </div>
     ))}
    </div>
   ) : (
    <p className="text-lg text-gray-500">Your cart is empty.</p>
   )}
  </div>
 );
};

export default Cart;
