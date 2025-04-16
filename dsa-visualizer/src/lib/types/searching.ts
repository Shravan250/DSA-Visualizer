export type SearchMethod =
  | "linear"
  | "binary"
  | "jump"
  | "interpolation"
  | "exponential";

export interface SearchControlsProps {
  arraySize: string;
  setArraySize: (size: string) => void;
  selectedMethod: SearchMethod;
  setSelectedMethod: (method: SearchMethod) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  stepDelay: number;
  setStepDelay: (delay: number) => void;
  onGenerateArray: () => void;
  onSearch: () => void;
  isSearching: boolean;
}

export type SearchVisualizerProps = {
  array: number[];
  searchValue: number;
  currentIndex?: number;
  visitedIndices?: number[];
  foundIndex?: number;
  shouldRefresh?: boolean;
  searchResult?: {
    found: boolean;
    comparisons: number;
    time: number;
  } | null;
};
