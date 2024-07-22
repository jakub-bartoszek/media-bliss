export default function AdminRootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <div className="w-full h-full min-h-screen bg-zinc-900">
   {children}
  </div>
 );
}
