"use client";

import React from "react";
import SortingVisualizer from "@/components/SortingVisualizer";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <main className="container mx-auto py-12">
        <div className="space-y-2 text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Sorting Algorithms
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Visualize and understand how different sorting algorithms work
          </p>
        </div>

        <Separator className="my-8" />

        <div className="space-y-16">
          <SortingVisualizer
            algorithm="bubble"
            title="Bubble Sort"
            description="Bubble Sort is the simplest sorting algorithm that works by repeatedly comparing the adjacent elements if they are in wrong order."
          />

          <SortingVisualizer
            algorithm="insertion"
            title="Insertion Sort"
            description="Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position."
          />

          <SortingVisualizer
            algorithm="selection"
            title="Selection Sort"
            description="The selection sort algorithm sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
