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
