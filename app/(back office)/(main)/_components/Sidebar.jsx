import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  FaChessQueen,
  FaRobot,
  FaBuildingColumns,
  FaDownLeftAndUpRightToCenter,
  FaBaseballBatBall,
  FaCircleQuestion,
  FaGear,
} from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

export const Sidebar = () => {
  const navigation = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <FaChessQueen className="text-primary" />,
    },
    {
      href: "/robots",
      name: "Robots",
      icon: <FaRobot className="text-primary" />,
    },
    {
      href: "/accounts",
      name: "Accounts",
      icon: <FaBuildingColumns className="text-primary" />,
    },
    {
      href: "/connections",
      name: "Connections",
      icon: <FaDownLeftAndUpRightToCenter className="text-primary" />,
    },
    {
      href: "/trade/iqoption",
      name: "Trade",
      icon: <FaBaseballBatBall className="text-primary" />,
    },
  ];

  const navsFooter = [
    {
      href: "/dashboard",
      name: "Help",
      icon: <FaCircleQuestion className="h-4 w-4" />,
    },
    {
      href: "/dashboard",
      name: "Settings",
      icon: <FaGear className="h-4 w-4" />,
    },
    {
      href: "/dashboard",
      name: "Logout",
      icon: <IoLogOut className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800 flex flex-col justify-between">
        <div className="">
          <div className="mb-3">
            <Logo />
          </div>
          <div className="items-center">
            <ul className="font-medium space-y-2">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-3 text-gray-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      // active
                      //   ? "bg-primary text-white dark:bg-white hover:text-primary"
                      //   : ""
                    )}
                  >
                    <span>{item.icon}</span>
                    <span className="ms-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="items-center">
          <ul className="pb-4 text-sm font-medium">
            {navsFooter.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                >
                  <div className="text-gray-500">{item.icon}</div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="py-4 px-4 border-t">
            <div className="flex items-center justify-center gap-x-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
