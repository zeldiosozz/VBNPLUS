import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/contact";
import SiteWavesBackground from "../components/SiteWavesBackground";
import WhatsAppBubble from "../components/WhatsAppBubble";

const vbnSans = localFont({
  src: [
    { path: "../public/fonts/noto-sans-regular.ttf", weight: "400" },
    { path: "../public/fonts/noto-sans-medium.ttf", weight: "500" },
    { path: "../public/fonts/noto-sans-semibold.ttf", weight: "600" },
    { path: "../public/fonts/noto-sans-bold.ttf", weight: "700 900" },
  ],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={cn("font-sans", vbnSans.variable)}
    >
      <body>
        <SiteWavesBackground />
        <div className="site-content relative z-10 min-h-screen">
          {children}
          <WhatsAppBubble phoneNumber={WHATSAPP_PHONE_NUMBER} />
        </div>
      </body>
    </html>
  );
}
