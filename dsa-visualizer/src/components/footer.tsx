import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-8">
      <Card className="border-none shadow-none">
        <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Image
              src="/assets/logo.svg"
              alt="AlgoArt Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-8">
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
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Copyright © 2025 Shravan Bobade
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}
