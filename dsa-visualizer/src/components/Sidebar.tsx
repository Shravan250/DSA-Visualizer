import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ArrayVisualizerOverview from "./sidebarInputs/arrayVisualizerOverview";
import LinkedListVisualizerOverview from "./sidebarInputs/linkedListVisualizerOverview";
import StackVisualizerOverview from "./sidebarInputs/stackVisualizerOverview";
import QueueVisualizerOverview from "./sidebarInputs/queueVisualizerOverview";
import TreesVisualizerOverview from "./sidebarInputs/treesVisualizerOverview";
import GraphVisualizerOverview from "./sidebarInputs/graphVisualizerOverview";
import SortingVisualizerOverview from "./sidebarInputs/sortingVisualizerOverview";
import SearchingVisualizerOverview from "./sidebarInputs/searchingVisualizerOverview";
import { ArrayOperations } from "@/hooks/useArrayOperations";
import { LinkedListOperations } from "@/hooks/useLinkedListOperations";
import { StackOperations } from "@/hooks/useStackOperations";
import { QueueOperations } from "@/hooks/useQueueOperations";
import { TreeOperations } from "@/hooks/useTreeOperations";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectStrategy: (strategyKey: string) => void;
  arrayOps: ArrayOperations;
  linkedListOps: LinkedListOperations;
  stackOps: StackOperations;
  queueOps: QueueOperations;
  treeOps: TreeOperations;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  onSelectStrategy,
  arrayOps,
  linkedListOps,
  stackOps,
  queueOps,
  treeOps,
}: SidebarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  // Mapping strategy keys to components.
  const strategyComponents: { [key: string]: JSX.Element } = {
    array: <ArrayVisualizerOverview arrayOps={arrayOps} />,
    linkedList: <LinkedListVisualizerOverview linkedListOps={linkedListOps} />,
    stack: <StackVisualizerOverview stackOps={stackOps} />,
    queue: <QueueVisualizerOverview queueOps={queueOps} />,
    trees: <TreesVisualizerOverview treeOps={treeOps} />,
    // graph: <GraphVisualizerOverview {...graphOps} />,
    // sorting: <SortingVisualizerOverview {...sortingOps} />,
    // searching: <SearchingVisualizerOverview {...searchingOps} />,
  };

  // Handler when a sub-element is clicked.
  const handleStrategyClick = (strategyKey: string) => {
    setSelectedStrategy(strategyKey);
    onSelectStrategy(strategyKey);
  };

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
              w-full md:w-100 h-screen 
              bg-white dark:bg-black p-4 text-black dark:text-white
              shadow-lg md:shadow-none
              z-40 md:z-0
              ${isMobile ? "mt-16" : ""}
            `}
          >
            {selectedStrategy ? (
              <div>
                <Button
                  onClick={() => setSelectedStrategy(null)}
                  variant="ghost"
                >
                  <ChevronLeft className="w-5 h-5 mr-2 dark:text-white" />
                </Button>
                <div className="mt-4 bg-white dark:bg-black p-4 rounded-lg">
                  {strategyComponents[selectedStrategy]}
                </div>
              </div>
            ) : (
              <div>
                {/* Data Structures Section */}
                <div className="mb-6 dark:bg-black">
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center w-full text-lg font-semibold hover:text-[#68B7A4] transition-colors dark:text-white">
                      <ChevronDown className="w-5 h-5 mr-2 dark:text-white" />
                      Data Structures
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-7 space-y-3">
                      <div
                        onClick={() => handleStrategyClick("array")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Array
                      </div>
                      <div
                        onClick={() => handleStrategyClick("linkedList")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Linked List
                      </div>
                      <div
                        onClick={() => handleStrategyClick("stack")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Stack
                      </div>
                      <div
                        onClick={() => handleStrategyClick("queue")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Queue
                      </div>
                      <div
                        onClick={() => handleStrategyClick("trees")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Trees
                      </div>
                      <div
                        onClick={() => handleStrategyClick("graph")}
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
                        onClick={() => handleStrategyClick("sorting")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Sorting
                      </div>
                      <div
                        onClick={() => handleStrategyClick("searching")}
                        className="block text-gray-700 hover:text-[#68B7A4] transition-colors dark:text-white"
                      >
                        Searching
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
