export type ArrayItem = {
  id: string;
  value: number;
};

export type ArrayOperations = {
  data: ArrayItem[];
  handlePush: (newValue: number) => void;
  handlePop: () => void;
  handleInsert: (newValue: number, index: number) => void;
  generateRandomArray: (size: number) => void;
  handleRemove: (index: number) => void;
  handleReset: () => void;
};
