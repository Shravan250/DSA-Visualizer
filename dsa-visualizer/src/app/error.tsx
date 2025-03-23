"use client";

import Image from "next/image";
type ErrorProps = {
  error: Error & { digest?: string };
};

import { useEffect } from "react";

export default function Error(error: ErrorProps) {
  useEffect(() => {
    console.error("Error: ", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen p-4 pt-0">
      <Image
        src="/assets/error.svg"
        alt="Error"
        className="w-full max-w-md md:w-1/2 lg:w-1/3 h-auto"
        width={100}
        height={100}
        priority
      />
      <h1 className="text-2xl md:text-3xl text-center text-black font-bold">
        Page not found...
      </h1>
      <p className="w-full max-w-md md:w-1/2 text-center text-sm md:text-base text-gray-500">
        Something went wrong. It's look that your requested could not be found.
        It's look like the link is broken or the page is removed.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors">
        Go back to home
      </button>
    </div>
  );
}
