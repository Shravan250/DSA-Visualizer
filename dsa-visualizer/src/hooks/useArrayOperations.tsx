// App.tsx
import React, { useState } from "react";
import { ArrayItem } from "../components/visualizers/arrayVisualizer";
import { generateId } from "../lib/utils";

type ArrayOperations = {
  data: ArrayItem[];
  handlePush: () => void;
  handlePop: () => void;
  handleInsert: () => void;
};

function useArrayOperations(initialData: ArrayItem[]): ArrayOperations {
  const predefinedData: ArrayItem[] = [
    { id: "1", value: 3 },
    { id: "2", value: 7 },
    { id: "3", value: 2 },
    { id: "4", value: 5 },
    { id: "5", value: 9 },
  ];

  const [data, setData] = useState<ArrayItem[]>(initialData ?? predefinedData);

  const handlePush = () => {
    const newValue = Math.floor(Math.random() * 10) + 1;
    setData([...data, { id: generateId(), value: newValue }]);
  };

  const handlePop = () => {
    setData(data.slice(0, data.length - 1));
  };

  const handleInsert = () => {
    const newValue = Math.floor(Math.random() * 10) + 1;
    const newData = [...data];
    newData.splice(2, 0, { id: generateId(), value: newValue });
    setData(newData);
  };

  return { data, handlePush, handlePop, handleInsert };
}
