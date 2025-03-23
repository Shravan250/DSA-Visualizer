"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute left-0 hidden md:flex flex-row sm:top-40 md:top-32">
      <Button
        variant="default"
        className="bg-[#68B7A4] p-2 md:p-3 sm:p-4 rounded-lg mt-10 md:mt-24 sm:mt-20 transition-all duration-300"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
        ) : (
          <Sun className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
        )}
      </Button>
      {theme === "light" ? (
        <Image
          src="/assets/arrow.svg"
          alt="arrow frame"
          width={150}
          height={150}
          className="w-24 h-24 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
