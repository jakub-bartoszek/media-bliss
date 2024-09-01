"use client";

import React from "react";
import useAccount from "@/lib/hooks/useAccount";
import Loader from "@/components/loader";
import Error from "@/components/error";
import EditAccountForm from "@/components/admin/edit-account-form";

interface AccountIdPageProps {
 params: {
  id: string;
 };
}

const AccountIdPage = ({ params }: AccountIdPageProps) => {
 const accountId = parseInt(params.id);
 const { account, loading, error } = useAccount(accountId);

 if (loading) {
  return <Loader />;
 }

 if (error) {
  return <Error />;
 }

 return (
  <>
   {!loading && !account && (
    <h1 className="w-full h-screen flex items-center justify-center text-zinc-500 text-2xl">
     Nie znaleziono konta
    </h1>
   )}
   {account && <EditAccountForm account={account} />}
  </>
 );
};

export default AccountIdPage;
