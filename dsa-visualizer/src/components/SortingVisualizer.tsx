"use client";

import React, { useState, useCallback, useRef } from "react";
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

interface SortingVisualizerProps {
  algorithm: "bubble" | "insertion" | "selection";
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
  const [speed, setSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [progress, setProgress] = useState(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const resetArray = () => {
    setArray(INITIAL_ARRAY);
    setTemp(null);
    setIsRunning(false);
    setProgress(0);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  const updateProgress = (current: number, total: number) => {
    setProgress((current / total) * 100);
  };

  const bubbleSort = async () => {
    const n = array.length;
    let totalSteps = (n * (n - 1)) / 2;
    let currentStep = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunning) return;
        setTemp(array[j]);
        await sleep(speed);
        currentStep++;
        updateProgress(currentStep, totalSteps);

        if (array[j] > array[j + 1]) {
          const newArray = [...array];
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArray(newArray);
        }
      }
    }
    setTemp(null);
    setIsRunning(false);
    setProgress(100);
  };

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
    setIsRunning(false);
    setProgress(100);
  };

  const selectionSort = async () => {
    const n = array.length;
    let totalSteps = n - 1;
    let currentStep = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      setTemp(array[i]);

      for (let j = i + 1; j < n; j++) {
        if (!isRunning) return;
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
          <div className="bg-[#E6FFFA] p-6 rounded-lg h-[200px] relative">
            <div className="flex justify-between items-end h-full">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`w-8 rounded-t-md relative transition-all duration-200 ${
                    temp === value ? "bg-yellow-500" : "bg-teal-500"
                  }`}
                  style={{ height: `${value * 20}px` }}
                >
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm dark:text-black">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
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
