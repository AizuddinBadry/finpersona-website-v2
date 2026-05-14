import type {Metadata} from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Finpersona",
    default: "Finpersona - AI-native personal finance platform",
  },
  description: "AI-native personal finance platform. Track expenses, maximize LHDN tax reliefs, split bills, and get AI-powered financial advice. Built for Malaysians.",
  keywords: ["personal finance","LHDN","tax relief","expense tracker","Malaysia","AI finance","fintech Malaysia"],
  authors: [{name:"Aexlora Sdn Bhd"}],
  creator: "Aexlora Sdn Bhd",
  metadataBase: new URL("https://finpersona.com"),
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://finpersona.com",
    siteName: "Finpersona",
    title: "Finpersona - AI-native personal finance platform",
    description: "Track expenses, maximize LHDN tax reliefs, split bills, and get AI-powered financial advice. Built for Malaysians.",
    images: [{url:"/og-image.png",width:1200,height:630,alt:"Finpersona"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finpersona - AI-native personal finance platform",
    description: "Track expenses, maximize LHDN tax reliefs, split bills, and AI-powered financial advice for Malaysians.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {url:"/icons/favicon-32x32.png",sizes:"32x32",type:"image/png"},
      {url:"/icons/icon-96x96.png",sizes:"96x96",type:"image/png"},
      {url:"/icons/icon-192x192.png",sizes:"192x192",type:"image/png"},
      {url:"/icons/icon-512x512.png",sizes:"512x512",type:"image/png"},
    ],
    apple: {url:"/icons/apple-touch-icon.png",sizes:"180x180",type:"image/png"},
    shortcut: "/icons/favicon-32x32.png",
  },
  robots: {index:true,follow:true},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
