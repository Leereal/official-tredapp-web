import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
        <div className="flex-none space-y-5 max-w-xl">
          <Link
            href="/"
            className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
          >
            <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
              News
            </span>
            <p className="flex items-center">
              Read the launch post from here
              <FaAngleRight />
            </p>
          </Link>
          <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
            Build your SaaS exactly how you want
          </h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </p>
          <div className="flex items-center gap-x-3 sm:text-sm">
            <Link
              href="/"
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-primary duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            >
              Get started
              <FaAngleRight />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex"
            >
              Contact sales
              <FaAngleRight />
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <Image
            src="/images/hero-image.svg"
            width={1000}
            height={1000}
            className="max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
