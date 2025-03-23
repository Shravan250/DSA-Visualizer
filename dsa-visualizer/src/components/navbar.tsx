import Link from "next/link";
import Image from "next/image";

export default function navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-black text-4xl font-bold">AlgoArt</h1>
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
          className="text-xl text-gray-600 hover:text-gray-900"
        >
          News
        </Link>
        <Link
          href="/algorithms"
          className="text-xl text-gray-600 hover:text-gray-900"
        >
          Algorithms
        </Link>
        <Link
          href="/about"
          className="text-xl text-gray-600 hover:text-gray-900"
        >
          About
        </Link>
      </div>
      <button className="text-xl bg-[#68B7A4] text-white px-6 py-2 rounded-full hover:bg-[#5aa090] transition-colors">
        Contact me
      </button>
    </nav>
  );
}
