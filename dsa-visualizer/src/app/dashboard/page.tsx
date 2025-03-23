"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-row items-start justify-start flex-auto relative">
        <Card className="flex flex-col items-center justify-start gap-3 min-w-10 p-2">
          <Button variant="ghost" size="icon" className="w-5 h-5 my-1">
            <Image
              src="/assets/play.svg"
              alt="play button"
              width={70}
              height={70}
            />
          </Button>
          <Button variant="ghost" size="icon" className="w-5 h-5 my-1">
            <Image
              src="/assets/pause.svg"
              alt="play button"
              width={100}
              height={100}
            />
          </Button>
          <Button variant="ghost" size="icon" className="w-5 h-5 my-1">
            <Image
              src="/assets/stop.svg"
              alt="play button"
              width={30}
              height={30}
            />
          </Button>
          <Button variant="ghost" size="icon" className="w-5 h-5 my-1">
            <Image
              src="/assets/stepInto.svg"
              alt="play button"
              width={20}
              height={20}
            />
          </Button>
          <Button variant="ghost" size="icon" className="w-5 h-5 my-1">
            <Image
              src="/assets/speedControl.svg"
              alt="play button"
              width={30}
              height={30}
            />
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
