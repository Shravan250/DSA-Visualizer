import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SortMethod } from "@/lib/types/sorting";
import { getSortAlgorithmDescription } from "@/lib/utils/sortingDescriptions";

interface SortControlsProps {
  arraySize: string;
  setArraySize: (size: string) => void;
  selectedMethod: SortMethod;
  setSelectedMethod: (method: SortMethod) => void;
  stepDelay: number;
  setStepDelay: (delay: number) => void;
  onGenerateArray: () => void;
  onSort: () => void;
  isSorting: boolean;
}

export function SortControls({
  arraySize,
  setArraySize,
  selectedMethod,
  setSelectedMethod,
  stepDelay,
  setStepDelay,
  onGenerateArray,
  onSort,
  isSorting,
}: SortControlsProps) {
  return (
    <div className="space-y-4">
      {/* Array Generation Controls */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Array size"
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
            min="5"
            max="100"
            disabled={isSorting}
          />
          <Button
            onClick={onGenerateArray}
            variant="outline"
            disabled={isSorting}
          >
            Generate Array
          </Button>
        </div>
      </div>

      <Separator />

      {/* Animation Speed Control */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Animation Speed</label>
        <div className="flex items-center gap-2">
          <span className="text-sm">Slow</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={stepDelay}
            onChange={(e) => setStepDelay(parseInt(e.target.value))}
            className="w-full"
            disabled={isSorting}
          />
          <span className="text-sm">Fast</span>
        </div>
      </div>

      <Separator />

      {/* Sort Method Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Sort Method</label>
        <Select
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value as SortMethod)}
          disabled={isSorting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sort method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bubble">Bubble Sort</SelectItem>
            <SelectItem value="selection">Selection Sort</SelectItem>
            <SelectItem value="insertion">Insertion Sort</SelectItem>
            <SelectItem value="merge">Merge Sort</SelectItem>
            <SelectItem value="quick">Quick Sort</SelectItem>
            <SelectItem value="heap">Heap Sort</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Sort Controls */}
      <div className="space-y-2">
        <Button onClick={onSort} className="w-full" disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Sorting"}
        </Button>
      </div>

      {/* Algorithm Description */}
      <div className="mt-4 p-3 bg-secondary/10 rounded-md">
        <h3 className="text-sm font-medium mb-2">
          {selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}{" "}
          Sort
        </h3>
        <p className="text-sm text-muted-foreground">
          {getSortAlgorithmDescription(selectedMethod)}
        </p>
      </div>
    </div>
  );
}
