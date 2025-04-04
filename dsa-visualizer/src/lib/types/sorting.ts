export type SortMethod =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap";

export interface SortResult {
  comparisons: number;
  swaps: number;
  time: number;
}

export interface SortVisualizerProps {
  array: number[];
  currentIndex: number;
  swapIndices: number[];
  sortedIndices: number[];
  shouldRefresh?: boolean;
  sortResult?: SortResult | null;
}
