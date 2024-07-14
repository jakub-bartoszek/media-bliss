import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <header className="h-14 flex justify-center bg-white fixed top-0 left-0 w-full shadow-[0_0_30px_#00000050] z-30">
    <Navigation />
   </header>
   <main className="max-w-[1400px] ml-auto mr-auto">
    <div className="w-full min-h-screen h-full flex flex-col items-center">
     {children}
    </div>
   </main>
   <Footer />
  </>
 );
}
