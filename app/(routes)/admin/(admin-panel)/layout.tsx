import AdminNavigation from "@/components/admin/admin-navigation";

const AdminPanelLayout = ({
 children
}: Readonly<{
 children: React.ReactNode;
}>) => {
 return (
  <div className="w-full h-screen flex overflow-hidden text-white">
   <AdminNavigation />
   <div className="w-full h-full flex overflow-hidden">
    <div className="w-full h-full overflow-y-auto">{children}</div>
   </div>
  </div>
 );
};

export default AdminPanelLayout;
