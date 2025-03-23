import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Button
        onClick={toggleSidebar}
        className="absolute top-0 right-0 z-50 p-2 bg-[#68B7A4] hover:bg-[#68B7A4]/90"
        variant="default"
        size="icon"
        id="sidebar-toggle"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{
              x: isMobile ? "100%" : "0%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: isMobile ? "100%" : "0%",
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className={`
              fixed md:absolute top-0 right-0 
              w-1/2 md:w-80 h-screen 
              bg-white p-4 text-black 
              shadow-lg md:shadow-none
              z-40 md:z-0
              ${isMobile ? "mt-16" : ""}
            `}
          >
            {/* Data Structures Section */}
            <div className="mb-6">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center w-full text-lg font-semibold hover:text-[#68B7A4] transition-colors">
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Data Structures
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-7 space-y-3">
                  <Link
                    href="/dashboard/array"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Array
                  </Link>
                  <Link
                    href="/dashboard/linked-list"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Linked List
                  </Link>
                  <Link
                    href="/dashboard/stack"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Stack
                  </Link>
                  <Link
                    href="/dashboard/queue"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Queue
                  </Link>
                  <Link
                    href="/dashboard/trees"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Trees
                  </Link>
                  <Link
                    href="/dashboard/graph"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Graph
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Algorithms Section */}
            <div>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center w-full text-lg font-semibold hover:text-[#68B7A4] transition-colors">
                  <ChevronRight className="w-5 h-5 mr-2" />
                  Algorithms
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-7 space-y-3 mt-2">
                  <Link
                    href="/dashboard/sorting"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Sorting
                  </Link>
                  <Link
                    href="/dashboard/searching"
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors"
                  >
                    Searching
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
