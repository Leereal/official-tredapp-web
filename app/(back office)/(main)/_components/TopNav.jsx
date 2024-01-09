import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FaBell, FaMagnifyingGlass, FaPowerOff } from "react-icons/fa6";

const TopNav = () => {
  return (
    <nav className="z-40 bg-white flex justify-between items-center mb-4 dark:bg-gray-900">
      <div
        className={cn("w-64 bg-slate-100 flex items-center rounded-full px-4")}
      >
        <FaMagnifyingGlass className="text-gray-500" />
        <Input
          placeholder="Search"
          className="border-none shadow-none focus-visible:ring-0 bg-transparent h-9 py-1"
        />
      </div>
      <div className="flex gap-4">
        <FaBell />
        <FaPowerOff />
      </div>
    </nav>
  );
};

export default TopNav;
