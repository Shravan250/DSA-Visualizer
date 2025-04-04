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
