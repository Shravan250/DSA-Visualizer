import { generateId } from "@/lib/utils";
import { useState } from "react";

export interface QueueItem {
  id: string;
  value: number;
  state: "default" | "inserting" | "highlighted" | "deleting";
}

export type QueueOperations = {
  data: QueueItem[];
  enqueue: (value: number) => void;
  dequeue: () => void;
  peek: () => number | null;
  isEmpty: () => boolean;
  reset: () => void;
};

export default function useQueueOperations() {
  const predefinedData: QueueItem[] = [
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

  const [data, setData] = useState<QueueItem[]>(predefinedData);

  //add item to the queue
  const enqueue = (value: number) => {
    const newItem: QueueItem = {
      id: generateId(),
      value,
      state: "inserting",
    };

    setData((prev) => [...prev, newItem]);

    // Reset state after animation
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) =>
          item.id === newItem.id ? { ...item, state: "default" } : item
        )
      );
    }, 500);
  };

  const dequeue = async () => {
    if (data.length === 0) return;

    // Mark front item for deletion
    setData((prev) =>
      prev.map((item, idx) =>
        idx === 0 ? { ...item, state: "deleting" } : item
      )
    );

    // Remove item after animation
    setTimeout(() => {
      setData((prev) => prev.slice(1));
    }, 500);
  };

  const peek = async () => {
    if (data.length === 0) return;

    // Highlight front item
    setData((prev) =>
      prev.map((item, idx) =>
        idx === 0 ? { ...item, state: "highlighted" } : item
      )
    );

    // Reset state after animation
    setTimeout(() => {
      setData((prev) => prev.map((item) => ({ ...item, state: "default" })));
    }, 1000);
  };

  //check if the queue is empty
  const isEmpty = () => {
    return data.length === 0;
  };

  //reset the queue
  const reset = () => {
    setData([]);
  };

  return {
    data,
    enqueue,
    dequeue,
    peek,
    isEmpty,
    reset,
  };
}
