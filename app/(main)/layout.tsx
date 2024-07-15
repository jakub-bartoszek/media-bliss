import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {

 return (
  <>
  <Header/>
   <main className="max-w-[1400px] ml-auto mr-auto pt-14">
    <div className="w-full min-h-screen h-full flex flex-col items-center">
     {children}
    </div>
   </main>
   <Footer />
  </>
 );
}
