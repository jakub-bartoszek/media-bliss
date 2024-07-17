import AdminNavigation from "@/components/admin/admin-navigation";

const AdminPanelLayout = ({
 children
}: Readonly<{
 children: React.ReactNode;
}>) => {
 return (
  <div className="w-full h-screen flex overflow-hidden">
   <AdminNavigation />
   <div className="w-full h-full">{children}</div>
  </div>
 );
};

export default AdminPanelLayout;
