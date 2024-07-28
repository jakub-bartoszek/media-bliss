"use client";

import React from "react";
import useService from "@/lib/hooks/useService";
import Loader from "@/components/loader";
import Error from "@/components/error";
import EditServiceForm from "@/components/admin/edit-service-form";

interface ServiceIdPageProps {
 params: {
  id: string;
 };
}

const ServiceIdPage: React.FC<ServiceIdPageProps> = ({ params }) => {
 const serviceId = parseInt(params.id);
 const { service, loading, error } = useService(serviceId);

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <>
   {!loading && !service && (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono usługi
    </h1>
   )}
   {service && <EditServiceForm service={service} />}
  </>
 );
};

export default ServiceIdPage;
