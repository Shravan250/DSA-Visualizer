import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-black dark:text-white text-4xl font-bold">
            AlgoArt
          </h1>
          <Image
            src="/assets/logo.svg"
            alt="AlgoArt Logo"
            width={50}
            height={50}
            className="ml-1"
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/news"
          className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          News
        </Link>
        <Link
          href="/algorithms"
          className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Algorithms
        </Link>
        <Link
          href="/about"
          className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          About
        </Link>
      </div>
      <Link href="/contact">
        <Button
          variant="default"
          className="text-xl bg-[#68B7A4] text-white px-6 py-2 rounded-full hover:bg-[#5aa090] transition-colors"
        >
          Contact me
        </Button>
      </Link>
    </nav>
  );
}
