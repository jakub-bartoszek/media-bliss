import { useState, useEffect } from "react";
import axios from "axios";
import { Order } from "@prisma/client";

const useOrders = () => {
 const [orders, setOrders] = useState<Order[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchOrders = async () => {
  try {
   setLoading(true);
   const response = await axios.get("/api/orders", {
    headers: {
     "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
    }
   });
   setOrders(response.data);
  } catch (error) {
   setError("Failed to fetch orders");
   console.error("Error fetching orders:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchOrders();
 }, []);

 return { orders, error, loading, refetch: fetchOrders };
};

export default useOrders;
