import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <header className="h-14 absolute top-0 w-full flex justify-center">
    <Navigation />
   </header>
   <main className="pt-14 max-w-[1400px]  ml-auto mr-auto min-h-screen h-full">
    {children}
   </main>
   <Footer />
  </>
 );
}
