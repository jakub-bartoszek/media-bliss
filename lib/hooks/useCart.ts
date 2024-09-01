import { useEffect, useState } from "react";
import { CartItem } from "@/types";
import axios from "axios";

const useCart = () => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchCartItems = async () => {
   setLoading(true);
   setError(null);

   try {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const response = await axios.post("/api/cart", { cartItems: storedCart });

    if (response.status === 200) {
     const { validCartItems } = response.data;
     setCartItems(validCartItems);
     localStorage.setItem("cart", JSON.stringify(validCartItems));
    } else {
     throw new Error("Failed to validate cart items.");
    }
   } catch (error) {
    setError("An error occurred during validation. Please try again later.");
    console.error("Validation error:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchCartItems();
 }, []);

 const removeItemFromCart = (cartId: string) => {
  const updatedCart = cartItems.filter((item) => item.id !== cartId);
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("storage"));
 };

 const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
   if (item.selected) {
    const price =
     typeof item.price === "number" ? item.price : Number(item.price);
    return total + price;
   }
   return total;
  }, 0);
 };

 return {
  cartItems,
  loading,
  error,
  removeItemFromCart,
  calculateTotal,
  setCartItems // expose setCartItems to allow direct manipulation in the component (e.g. for link validation)
 };
};

export default useCart;
