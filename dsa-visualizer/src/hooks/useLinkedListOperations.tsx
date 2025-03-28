import { generateId } from "@/lib/utils";
import { useState } from "react";

export type LinkedListItem = {
  id: string;
  value: number;
  next: LinkedListItem | null;
  state?: "default" | "active" | "inserting" | "deleting" | "traversing";
};

export type LinkedListOperations = {
  data: LinkedListItem[];
  handlePush: (newValue: number) => void;
  handlePop: () => void;
  handleInsert: (newValue: number, index: number) => void;
  handleRemove: (index: number) => void;
  handleReset: () => void;
};

const useLinkedListOperations = (): LinkedListOperations => {
  const [data, setData] = useState<LinkedListItem[]>([
    { id: generateId(), value: 1, next: null, state: "default" },
    { id: generateId(), value: 2, next: null, state: "default" },
  ]);

  const handlePush = async (newValue: number) => {
    const newNode: LinkedListItem = {
      id: generateId(),
      value: newValue,
      next: null,
      state: "default",
    };

    // Animate traversal to the last node
    for (let i = 0; i < data.length; i++) {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          state: idx === i ? "traversing" : item.state,
        }))
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Insert the new node
    setData((prev) => {
      const newData = [...prev];
      if (newData.length > 0) {
        newData[newData.length - 1].next = newNode;
      }
      newNode.state = "inserting";
      return [...newData, newNode];
    });

    // Reset states after animation
    setTimeout(() => {
      setData((prev) => prev.map((item) => ({ ...item, state: "default" })));
    }, 1000);
    console.log(data);
  };

  const handlePop = async () => {
    if (data.length <= 1) return;

    // Animate traversal to the second-to-last node
    for (let i = 0; i < data.length - 1; i++) {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          state: idx === i ? "traversing" : item.state,
        }))
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Mark last node for deletion
    setData((prev) =>
      prev.map((item, index) =>
        index === prev.length - 1
          ? { ...item, state: "deleting" }
          : index === prev.length - 2
          ? { ...item, next: null }
          : item
      )
    );

    // Remove after animation
    setTimeout(() => {
      setData((prev) => prev.slice(0, -1));
      setData((prev) => prev.map((item) => ({ ...item, state: "default" })));
    }, 1000);
  };

  const handleInsert = async (newValue: number, index: number) => {
    if (index < 0 || index > data.length) return;

    const newNode: LinkedListItem = {
      id: generateId(),
      value: newValue,
      next: null,
      state: "default",
    };

    // Animate traversal
    for (let i = 0; i < index; i++) {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          state: idx === i ? "traversing" : item.state,
        }))
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Insert node
    setData((prev) => {
      const newData = [...prev];
      if (index === 0) {
        newNode.next = newData[0] || null;
        newNode.state = "inserting";
        return [newNode, ...newData];
      }

      newNode.next = newData[index] || null;
      newData[index - 1].next = newNode;
      newNode.state = "inserting";
      return [...newData.slice(0, index), newNode, ...newData.slice(index)];
    });

    // Reset states
    setTimeout(() => {
      setData((prev) => prev.map((item) => ({ ...item, state: "default" })));
    }, 1000);
  };

  const handleRemove = async (index: number) => {
    console.log(index);
    if (index < 0 || index >= data.length) return;

    // Mark node for deletion
    await new Promise<void>((resolve) => {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          state: idx === index ? "deleting" : item.state,
        }))
      );

      setTimeout(resolve, 500);
    });

    // Animate traversal to the node before the one to be deleted
    for (let i = 0; i < index; i++) {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          state: idx === i ? "traversing" : item.state,
        }))
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Remove the node
    setData((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);

      // Update next references
      if (index > 0 && index < newData.length) {
        newData[index - 1].next = newData[index] || null;
      }

      return newData;
    });

    // Reset states
    setTimeout(() => {
      setData((prev) => prev.map((item) => ({ ...item, state: "default" })));
    }, 1000);
    console.log(data);
  };

  const handleReset = () => {
    setData([{ id: "1", value: 1, next: null, state: "default" }]);
  };

  return {
    data,
    handlePush,
    handlePop,
    handleInsert,
    handleRemove,
    handleReset,
  };
};

export default useLinkedListOperations;
