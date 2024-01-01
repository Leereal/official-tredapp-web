import Link from "next/link";

const SectionHeader = ({ name }) => {
  return (
    <div className="">
      <div className="h-20 items-start justify-between py-6 px-2 border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">{name}</h3>
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <Link
            href="/"
            className="block px-4 py-2 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Browse reports
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 mt-3 text-center text-gray-700 duration-150 font-medium rounded-lg border hover:bg-gray-50 active:bg-gray-100 sm:mt-0 md:text-sm"
          >
            Engagement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
