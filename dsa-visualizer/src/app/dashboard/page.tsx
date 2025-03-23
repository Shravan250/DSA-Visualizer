"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
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

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <Card
          className={`min-w-3/4 min-h-screen flex items-center justify-center
            flex-1
            transition-all duration-300
            ${isSidebarOpen ? "mr-80" : "mr-0"}
          `}
        >
          <h1 className="text-4xl font-bold text-black text-center">
            DSA Visualizer
          </h1>
        </Card>
        <div>
          {/* Sidebar */}
          <div className="absolute top-0 right-0">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
