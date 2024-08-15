import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <Header />
   <main className="max-w-[1400px] ml-auto mr-auto">
    <div className="w-full min-h-[calc(100vh-56px)] h-full flex flex-col items-center mt-[56px]">
     {children}
    </div>
   </main>
   <Footer />
  </>
 );
}
