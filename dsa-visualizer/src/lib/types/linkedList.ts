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
