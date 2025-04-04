"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";

type Algorithm =
  | "bubble"
  | "insertion"
  | "selection"
  | "quick"
  | "merge"
  | "heap";

interface SortingVisualizerProps {
  algorithm: Algorithm;
  title: string;
  description: string;
}

const INITIAL_ARRAY = [2, 5, 1, 8, 4, 7, 3, 6];
const DEFAULT_ANIMATION_SPEED = 100;

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  algorithm,
  title,
  description,
}) => {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [isRunning, setIsRunning] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [comparing, setComparing] = useState<number[]>([]);
  const [speed, setSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [progress, setProgress] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const resetArray = () => {
    setArray(INITIAL_ARRAY);
    setTemp(null);
    setComparing([]);
    setIsRunning(false);
    setProgress(0);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const updateProgress = (current: number, total: number) => {
    setProgress((current / total) * 100);
  };

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 180;
    const barPadding = 4;
    const barWidth = (width - (array.length - 1) * barPadding) / array.length;

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(array) || 0])
      .range([0, height - 30]);

    // Create bars
    svg
      .selectAll(".bar")
      .data(array)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => i * (barWidth + barPadding))
      .attr("y", (d) => height - yScale(d) - 30)
      .attr("width", barWidth)
      .attr("height", (d) => yScale(d))
      .attr("rx", 3)
      .attr("fill", (d, i) => {
        if (temp === d) return "#F59E0B"; // Yellow for temp
        if (comparing.includes(i)) return "#EC4899"; // Pink for comparing
        return "#14B8A6"; // Default teal
      });

    // Add text labels
    svg
      .selectAll(".label")
      .data(array)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => i * (barWidth + barPadding) + barWidth / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d, i) => i + 1);

    // Add value labels
    svg
      .selectAll(".value")
      .data(array)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (d, i) => i * (barWidth + barPadding) + barWidth / 2)
      .attr("y", (d) => height - yScale(d) - 35)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d);
  }, [array, temp, comparing]);

  // Bubble Sort
  const bubbleSort = async () => {
    const n = array.length;
    let totalSteps = (n * (n - 1)) / 2;
    let currentStep = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunning) return;
        setComparing([j, j + 1]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (array[j] > array[j + 1]) {
          setTemp(array[j]);
          const newArray = [...array];
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArray(newArray);
          await sleep(speed / 2);
        }
      }
    }
    setTemp(null);
    setComparing([]);
    setIsRunning(false);
    setProgress(100);
  };

  // Insertion Sort
  const insertionSort = async () => {
    const n = array.length;
    let totalSteps = n - 1;
    let currentStep = 0;

    for (let i = 1; i < n; i++) {
      const key = array[i];
      setTemp(key);
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        if (!isRunning) return;
        setComparing([j, j + 1]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        const newArray = [...array];
        newArray[j + 1] = newArray[j];
        setArray(newArray);
        j--;
      }

      const newArray = [...array];
      newArray[j + 1] = key;
      setArray(newArray);
      await sleep(speed);
    }
    setTemp(null);
    setComparing([]);
    setIsRunning(false);
    setProgress(100);
  };

  // Selection Sort
  const selectionSort = async () => {
    const n = array.length;
    let totalSteps = n - 1;
    let currentStep = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      setTemp(array[i]);

      for (let j = i + 1; j < n; j++) {
        if (!isRunning) return;
        setComparing([minIdx, j]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const newArray = [...array];
        [newArray[i], newArray[minIdx]] = [newArray[minIdx], newArray[i]];
        setArray(newArray);
      }
    }
    setTemp(null);
    setComparing([]);
    setIsRunning(false);
    setProgress(100);
  };

  // Quick Sort
  const quickSort = async () => {
    const n = array.length;
    const totalSteps = n * Math.log2(n);
    let currentStep = 0;

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high];
      setTemp(pivot);
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        if (!isRunning) return -1;
        setComparing([j, high]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (arr[j] < pivot) {
          i++;
          const newArray = [...arr];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          setArray(newArray);
        }
      }

      const newArray = [...arr];
      [newArray[i + 1], newArray[high]] = [newArray[high], newArray[i + 1]];
      setArray(newArray);
      return i + 1;
    };

    const quickSortRecursive = async (
      arr: number[],
      low: number,
      high: number
    ) => {
      if (low < high && isRunning) {
        const pi = await partition(arr, low, high);
        if (pi === -1) return; // Sorting was interrupted
        await quickSortRecursive(arr, low, pi - 1);
        await quickSortRecursive(arr, pi + 1, high);
      }
    };

    await quickSortRecursive([...array], 0, array.length - 1);

    if (isRunning) {
      setTemp(null);
      setComparing([]);
      setIsRunning(false);
      setProgress(100);
    }
  };

  // Merge Sort
  const mergeSort = async () => {
    const n = array.length;
    const totalSteps = n * Math.log2(n);
    let currentStep = 0;

    const merge = async (
      arr: number[],
      left: number,
      mid: number,
      right: number
    ) => {
      const n1 = mid - left + 1;
      const n2 = right - mid;

      const L = arr.slice(left, mid + 1);
      const R = arr.slice(mid + 1, right + 1);

      let i = 0,
        j = 0,
        k = left;

      while (i < n1 && j < n2) {
        if (!isRunning) return;
        setComparing([left + i, mid + 1 + j]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (L[i] <= R[j]) {
          const newArray = [...array];
          newArray[k] = L[i];
          setArray(newArray);
          setTemp(L[i]);
          i++;
        } else {
          const newArray = [...array];
          newArray[k] = R[j];
          setArray(newArray);
          setTemp(R[j]);
          j++;
        }
        k++;
      }

      while (i < n1) {
        if (!isRunning) return;
        await sleep(speed);
        const newArray = [...array];
        newArray[k] = L[i];
        setArray(newArray);
        setTemp(L[i]);
        i++;
        k++;
      }

      while (j < n2) {
        if (!isRunning) return;
        await sleep(speed);
        const newArray = [...array];
        newArray[k] = R[j];
        setArray(newArray);
        setTemp(R[j]);
        j++;
        k++;
      }
    };

    const mergeSortRecursive = async (
      arr: number[],
      left: number,
      right: number
    ) => {
      if (left < right && isRunning) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortRecursive(arr, left, mid);
        await mergeSortRecursive(arr, mid + 1, right);
        await merge(arr, left, mid, right);
      }
    };

    await mergeSortRecursive([...array], 0, array.length - 1);

    if (isRunning) {
      setTemp(null);
      setComparing([]);
      setIsRunning(false);
      setProgress(100);
    }
  };

  // Heap Sort
  const heapSort = async () => {
    const n = array.length;
    const totalSteps = n * Math.log2(n);
    let currentStep = 0;

    const heapify = async (arr: number[], n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        setComparing([largest, left]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        setComparing([largest, right]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== i && isRunning) {
        setTemp(arr[i]);
        const newArray = [...arr];
        [newArray[i], newArray[largest]] = [newArray[largest], newArray[i]];
        setArray(newArray);
        await sleep(speed);

        await heapify(newArray, n, largest);
      }
    };

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (!isRunning) return;
      await heapify([...array], n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      if (!isRunning) return;
      setTemp(array[0]);
      const newArray = [...array];
      [newArray[0], newArray[i]] = [newArray[i], newArray[0]];
      setArray(newArray);
      await sleep(speed);

      await heapify(newArray, i, 0);
    }

    setTemp(null);
    setComparing([]);
    setIsRunning(false);
    setProgress(100);
  };

  const handleStart = useCallback(() => {
    setIsRunning(true);
    setProgress(0);
    switch (algorithm) {
      case "bubble":
        bubbleSort();
        break;
      case "insertion":
        insertionSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "quick":
        quickSort();
        break;
      case "merge":
        mergeSort();
        break;
      case "heap":
        heapSort();
        break;
    }
  }, [algorithm, array, speed]);

  const handlePause = () => {
    setIsRunning(false);
  };

  const getAlgorithmCode = () => {
    switch (algorithm) {
      case "bubble":
        return `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
      case "insertion":
        return `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`;
      case "selection":
        return `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`;
      case "quick":
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;
      case "merge":
        return `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}`;
      case "heap":
        return `function heapSort(arr) {
  const n = arr.length;
  
  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-[#E6FFFA] p-6 rounded-lg h-[240px] relative">
            <svg ref={svgRef} width="100%" height="200px"></svg>
            <div className="absolute top-4 left-4 space-y-2">
              <p className="text-sm text-gray-600">
                Temp: {temp !== null ? temp : "-"}
              </p>
              <Progress
                value={progress}
                className="w-[100px] dark:bg-gray-300 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-white">
                Animation Speed:
              </span>
              <Slider
                defaultValue={[speed]}
                max={500}
                min={50}
                step={50}
                onValueChange={([value]) => setSpeed(value)}
                className="w-[200px]"
              />
            </div>

            <Separator className="my-4" />

            <div className="flex gap-4">
              <Button
                onClick={handleStart}
                disabled={isRunning}
                className="bg-teal-500 hover:bg-teal-600"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start
              </Button>
              <Button
                onClick={handlePause}
                disabled={!isRunning}
                variant="outline"
              >
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button
                onClick={resetArray}
                variant="outline"
                className="ml-auto"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Implementation</h3>
            <Card>
              <CardContent className="p-0">
                <pre className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{getAlgorithmCode()}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SortingVisualizer;
