"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { OrderWithCustomer } from "@/types";

const useOrder = (orderId?: number) => {
 const [order, setOrder] = useState<OrderWithCustomer | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(false);

 const fetchOrder = async () => {
  try {
   setLoading(true);

   const response = await axios.get(`/api/orders/${orderId}`);
   setOrder(response.data);
  } catch (error) {
   setError("Failed to fetch order");
   console.error("Error fetching order:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchOrder();
 }, [orderId]);

 return { order, error, loading };
};

export default useOrder;
