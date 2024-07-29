"use client";

import React from "react";
import useOrder from "@/lib/hooks/useOrder";
import Loader from "@/components/loader";
import Error from "@/components/error";

interface OrderIdPageProps {
 params: {
  id: string;
 };
}

const OrderIdPage: React.FC<OrderIdPageProps> = ({ params }) => {
 const orderId = parseInt(params.id);
 const { order, loading, error } = useOrder(orderId);

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <>
   {!loading && !order && (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono usługi
    </h1>
   )}
   {order && <div>{order.email}</div>}
  </>
 );
};

export default OrderIdPage;
