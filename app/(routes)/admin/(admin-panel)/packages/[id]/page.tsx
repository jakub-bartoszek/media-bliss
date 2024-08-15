"use client";

import React from "react";
import usePackage from "@/lib/hooks/usePackage";
import Loader from "@/components/loader";
import Error from "@/components/error";
import EditPackageForm from "@/components/admin/edit-package-form";

interface PackageIdPageProps {
 params: {
  id: string;
 };
}

const PackageIdPage: React.FC<PackageIdPageProps> = ({ params }) => {
 const serviceId = parseInt(params.id);
 const { pkg, loading, error } = usePackage(serviceId);

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <>
   {!loading && !pkg && (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono pakietu
    </h1>
   )}
   {pkg && <EditPackageForm pkg={pkg} />}
  </>
 );
};

export default PackageIdPage;
