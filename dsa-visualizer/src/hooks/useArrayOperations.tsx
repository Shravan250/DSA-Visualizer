import React, { useState } from "react";
import { ArrayItem } from "../components/visualizers/arrayVisualizer";
import { generateId } from "../lib/utils";

export type ArrayOperations = {
  data: ArrayItem[];
  handlePush: (newValue: number) => void;
  handlePop: () => void;
  handleInsert: (newValue: number, index: number) => void;
  generateRandomArray: (size: number) => void;
  handleRemove: (index: number) => void;
  handleReset: () => void;
};

function useArrayOperations(): ArrayOperations {
  const predefinedData: ArrayItem[] = [
    { id: "1", value: 3 },
    { id: "2", value: 7 },
    { id: "3", value: 2 },
    { id: "4", value: 5 },
    { id: "5", value: 9 },
  ];

  const [data, setData] = useState<ArrayItem[]>(predefinedData);

  const handlePush = (newValue: number) => {
    setData([...data, { id: generateId(), value: newValue }]);
  };

  const handlePop = () => {
    setData(data.slice(0, data.length - 1));
  };

  const handleInsert = (newValue: number, index: number) => {
    const newData = [...data];
    newData.splice(index, 0, { id: generateId(), value: newValue });
    setData(newData);
  };

  const generateRandomArray = (size: number) => {
    const newData = [];
    for (let i = 0; i < size; i++) {
      newData.push({
        id: generateId(),
        value: Math.floor(Math.random() * 10) + 1,
      });
    }
    setData(newData);
  };

  const handleRemove = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleReset = () => {
    setData([]);
  };

  return {
    data,
    handlePush,
    handlePop,
    handleInsert,
    generateRandomArray,
    handleRemove,
    handleReset,
  };
}

export default useArrayOperations;
