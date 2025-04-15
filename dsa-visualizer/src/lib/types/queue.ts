export interface QueueItem {
  id: string;
  value: number;
  state: "default" | "inserting" | "highlighted" | "deleting";
}

export type QueueOperations = {
  data: QueueItem[];
  enqueue: (value: number) => void;
  dequeue: () => void;
  peek: () => Promise<void>;
  isEmpty: () => boolean;
  reset: () => void;
};
