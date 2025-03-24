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

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("line");

  // const strategies: { [key: string]: any } = {
  //   // line: lineChartStrategy,
  //   // array: arrayStrategy,
  //   // linkedList: linkedListStrategy,
  //   // stack: stackStrategy,
  //   // queue: queueStrategy,
  //   // trees: treesStrategy,
  //   // graph: graphStrategy,
  //   // sorting: sortingStrategy,
  //   // searching: searchingStrategy,
  // };

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
            isSidebarOpen ? "mr-80" : "mr-0"
          }`}
        >
          {/* <GeneralVisualizer /> */}
          <ArrayVisualizer data={[1, 2, 3, 4, 5]} width={1000} height={1000} />
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
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
