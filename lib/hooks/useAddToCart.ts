import { useState } from "react";
import { CartItem } from "@/types";

export const useAddToCart = () => {
 const [isCartModalOpen, setCartModalOpen] = useState(false);
 const [latestItem, setLatestItem] = useState<CartItem | null>(null);

 const handleAddToCart = ({
  id,
  name,
  category,
  price,
  requireLink
 }: CartItem) => {
  const product = {
   id,
   name,
   category,
   price,
   requireLink
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));

  setLatestItem(product);
  setCartModalOpen(true);
 };

 const handleViewCart = () => {
  setCartModalOpen(false);
  window.location.href = "/cart";
 };

 return {
  isCartModalOpen,
  latestItem,
  handleAddToCart,
  handleViewCart,
  closeModal: () => setCartModalOpen(false)
 };
};
