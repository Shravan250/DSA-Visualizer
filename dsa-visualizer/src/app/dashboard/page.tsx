"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowDownToDot,
  CircleStop,
  FastForward,
  Pause,
  PlayCircle,
} from "lucide-react";
import { GeneralVisualizer } from "@/components/generalVisualizer";
import ArrayVisualizer from "@/components/visualizers/arrayVisualizer";
import StackVisualizerOverview from "@/components/sidebarInputs/stackVisualizerOverview";
import ArrayVisualizerOverview from "@/components/sidebarInputs/arrayVisualizerOverview";
import LinkedListVisualizerOverview from "@/components/sidebarInputs/linkedListVisualizerOverview";
import QueueVisualizerOverview from "@/components/sidebarInputs/queueVisualizerOverview";
import TreesVisualizerOverview from "@/components/sidebarInputs/treesVisualizerOverview";
import GraphVisualizerOverview from "@/components/sidebarInputs/graphVisualizerOverview";
import SortingVisualizerOverview from "@/components/sidebarInputs/sortingVisualizerOverview";
import SearchingVisualizerOverview from "@/components/sidebarInputs/searchingVisualizerOverview";
import useArrayOperations from "@/hooks/useArrayOperations";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");

  // Map each strategy key to its corresponding component.
  const strategyComponents: { [key: string]: JSX.Element } = {
    array: <ArrayVisualizerOverview />,
    linkedList: <LinkedListVisualizerOverview />,
    stack: <StackVisualizerOverview />,
    queue: <QueueVisualizerOverview />,
    trees: <TreesVisualizerOverview />,
    graph: <GraphVisualizerOverview />,
    sorting: <SortingVisualizerOverview />,
    searching: <SearchingVisualizerOverview />,
  };

  // Get array state and operations from our custom hook.
  const arrayOps = useArrayOperations();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-row items-start justify-start flex-auto relative">
        <Card className="flex flex-col items-center justify-start gap-3 min-w-10 p-2">
          <Button variant="ghost" size="icon" className="hover:text-green-600">
            <PlayCircle size={200} className="text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-yellow-600">
            <Pause size={100} className="text-yellow-500" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-red-600">
            <CircleStop size={100} className="text-red-500" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-blue-600">
            <ArrowDownToDot
              width={100}
              height={100}
              className="text-blue-500"
            />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-purple-600">
            <FastForward size={100} className="text-purple-500" />
          </Button>
        </Card>

        {/* Resize Visualizer Window */}
        <Card
          className={`min-w-3/4 min-h-screen flex items-center justify-center flex-1 transition-all duration-300 ${
            isSidebarOpen ? "mr-100" : "mr-0"
          }`}
        >
          {/* <GeneralVisualizer /> */}
          <GeneralVisualizer
            selectedStrategy={selectedStrategy}
            arrayOps={arrayOps}
          />
        </Card>

        <div>
          {/* Sidebar */}
          <div className="absolute top-0 right-0 dark:bg-black">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onSelectStrategy={(strategyKey: string) =>
                setSelectedStrategy(strategyKey)
              }
              arrayOps={arrayOps}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
