"use client";

import React from "react";
import useCustomer from "@/lib/hooks/useCustomer";
import Loader from "@/components/client/loader";
import Error from "@/components/client/error";
import EditCustomerForm from "@/components/admin/edit-customer-form";

interface CustomerIdPageProps {
 params: {
  id: string;
 };
}

const CustomerIdPage: React.FC<CustomerIdPageProps> = ({
 params
}) => {
 const customerId = parseInt(params.id);
 const { customer, loading, error } = useCustomer(customerId);

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <>
   {!loading && !customer && (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono klienta
    </h1>
   )}
   {customer && <EditCustomerForm customer={customer} />}
  </>
 );
};

export default CustomerIdPage;
