import Footer from "@/components/client/footer";
import Header from "@/components/client/header";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <Header />
   <main className="max-w-[1400px] ml-auto mr-auto">
    <div className="w-full min-h-screen flex flex-col items-center">
     {children}
    </div>
   </main>
   <Footer />
  </>
 );
}
