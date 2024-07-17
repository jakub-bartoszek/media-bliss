export default function AdminLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <div className="w-full h-full bg-black/90">
   {children}
  </div>
 );
}
