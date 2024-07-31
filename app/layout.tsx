import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ToasterProvider from "@/components/toaster-provider";
import CookieBanner from "@/components/cookie-banner";

const roboto = Roboto({
 weight: "400",
 subsets: ["latin"]
});

export const metadata: Metadata = {
 title: "Media Bliss",
 icons: { icon: "/logos/mb.png" },
 description: "Generated by create next app"
};

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <head>
    <meta charSet="UTF-8" />
    <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0"
    />
    <script
     dangerouslySetInnerHTML={{
      __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1179062023217294'); 
              fbq('track', 'PageView');`
     }}
    />
    <noscript>
     <img
      height="1"
      width="1"
      style={{ display: "none" }}
      src="https://www.facebook.com/tr?id=1179062023217294&ev=PageView&noscript=1"
     />
    </noscript>
   </head>
   <body className={roboto.className}>
    <ToasterProvider />
    {children}
    <CookieBanner />
   </body>
  </html>
 );
}
