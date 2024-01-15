import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
const headingFont = localFont({ src: "../public/fonts/font.woff2" });

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-2 hidden md:flex">
        <Image
          src="/images/tredapp_logo.png"
          alt="logo"
          sizes=""
          height={400}
          width={124}
        />
      </div>
    </Link>
  );
};
