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
  onSelectStrategy: (strategyKey: string) => void;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  onSelectStrategy,
}: SidebarProps) {
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
              bg-white dark:bg-black p-4 text-black dark:text-white
              shadow-lg md:shadow-none
              z-40 md:z-0
              ${isMobile ? "mt-16" : ""}
            `}
          >
            {/* Data Structures Section */}
            <div className="mb-6 dark:bg-black">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center w-full text-lg font-semibold hover:text-[#68B7A4] transition-colors dark:text-white">
                  <ChevronDown className="w-5 h-5 mr-2 dark:text-white" />
                  Data Structures
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-7 space-y-3">
                  <div
                    onClick={() => onSelectStrategy("array")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Array
                  </div>
                  <div
                    onClick={() => onSelectStrategy("linked-list")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Linked List
                  </div>
                  <div
                    onClick={() => onSelectStrategy("stack")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Stack
                  </div>
                  <div
                    onClick={() => onSelectStrategy("queue")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Queue
                  </div>
                  <div
                    onClick={() => onSelectStrategy("trees")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Trees
                  </div>
                  <div
                    onClick={() => onSelectStrategy("graph")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Graph
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Algorithms Section */}
            <div>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center w-full text-lg font-semibold hover:text-[#68B7A4] transition-colors dark:text-white">
                  <ChevronRight className="w-5 h-5 mr-2 dark:text-white" />
                  Algorithms
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-7 space-y-3 mt-2">
                  <div
                    onClick={() => onSelectStrategy("sorting")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Sorting
                  </div>
                  <div
                    onClick={() => onSelectStrategy("searching")}
                    className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                  >
                    Searching
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
