import AdminNavigation from "@/components/admin/admin-navigation";

const AdminPanelLayout = ({
 children
}: Readonly<{
 children: React.ReactNode;
}>) => {
 return (
  <div className="w-screen h-screen flex">
   <AdminNavigation />
   <div className="h-screen w-full">{children}</div>
  </div>
 );
};

export default AdminPanelLayout;
