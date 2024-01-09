import { Nunito } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description || "",
  icons: [{ url: "/images/logo.png", href: "/images/logo.png" }],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          {children} <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
