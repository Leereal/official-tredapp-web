import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
