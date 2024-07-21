export default function AdminRootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return <div className="w-full h-full bg-black/90">{children}</div>;
}
