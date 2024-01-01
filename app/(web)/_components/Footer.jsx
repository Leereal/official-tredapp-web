import { Logo } from "@/components/Logo";
import { FaArrowRightLong } from "react-icons/fa6";

import Link from "next/link";
const currentYear = new Date().getFullYear();
const Footer = () => {
  const footerNavs = [
    {
      href: "/",
      name: "Terms",
    },
    {
      href: "/",
      name: "License",
    },
    {
      href: "/",
      name: "Privacy",
    },
    {
      href: "/",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center justify-center">
          <Logo />
          <p>
            Nulla auctor metus vitae lectus iaculis, vel euismod massa
            efficitur.
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            <Link
              href="/sign-up"
              className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Let's get started
            </Link>
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
            >
              Get access
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          <p>
            © {currentYear} {process.env.website || "Tredapp"}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
            {footerNavs.map((item, idx) => (
              <li
                className="text-gray-800 hover:text-gray-500 duration-150"
                key={idx}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
