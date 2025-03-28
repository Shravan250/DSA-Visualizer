import { generateId } from "@/lib/utils";
import { useState } from "react";

export interface StackItem {
  id: string;
  value: number;
  state: "default" | "inserting" | "highlighted" | "deleting";
}

export type StackOperations = {
  data: StackItem[];
  push: (value: number) => void;
  pop: () => void;
  peek: () => void;
  isEmpty: () => boolean;
  size: () => number;
  reset: () => void;
};

const useStackOperations = (): StackOperations => {
  const predefinedData: StackItem[] = [
    {
      id: generateId(),
      value: 1,
      state: "default",
    },
    {
      id: generateId(),
      value: 2,
      state: "default",
    },
  ];
  const [data, setData] = useState<StackItem[]>(predefinedData);

  const push = (value: number) => {
    const newItem: StackItem = {
      id: generateId(),
      value,
      state: "inserting",
    };
    // Add new item to the stack
    setData((prev) => [...prev, newItem]);

    // Mark the item as default
    setData((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1 ? { ...item, state: "default" } : item
      )
    );
  };

  const pop = async () => {
    if (data.length === 0) return;

    // Mark the top item as deleting
    setData((prev) => {
      const newData = [...prev];
      newData[newData.length - 1].state = "deleting";
      return newData;
    });

    // Remove the top item
    setData((prev) => prev.slice(0, -1));

    // Wait for the deletion to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mark the item as default
    setData((prev) =>
      prev.map((item, index) =>
        index === prev.length ? { ...item, state: "default" } : item
      )
    );
  };

  const peek = async () => {
    if (data.length === 0) return;

    // Mark the top item as highlighted
    setData((prev) => {
      const newData = [...prev];
      newData[newData.length - 1].state = "highlighted";
      return newData;
    });

    // Wait for the highlighting to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mark the item as default
    setData((prev) =>
      prev.map((item, index) =>
        index === prev.length ? { ...item, state: "default" } : item
      )
    );
  };

  const isEmpty = () => {
    return data.length === 0;
  };

  const size = () => {
    return data.length;
  };

  const reset = () => {
    setData([]);
  };

  return { push, pop, peek, isEmpty, size, reset, data };
};

export default useStackOperations;
