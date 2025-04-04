import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchMethod } from "@/lib/types/searching";
import { getSearchAlgorithmDescription } from "@/lib/utils/searchingDescriptions";

interface SearchControlsProps {
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

export function SearchControls({
  arraySize,
  setArraySize,
  selectedMethod,
  setSelectedMethod,
  searchValue,
  setSearchValue,
  stepDelay,
  setStepDelay,
  onGenerateArray,
  onSearch,
  isSearching,
}: SearchControlsProps) {
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
            disabled={isSearching}
          />
          <Button
            onClick={onGenerateArray}
            variant="outline"
            disabled={isSearching}
          >
            Generate Array
          </Button>
        </div>
      </div>

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
            disabled={isSearching}
          />
          <span className="text-sm">Fast</span>
        </div>
      </div>

      {/* Search Method Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search Method</label>
        <Select
          value={selectedMethod}
          onValueChange={(value) => setSelectedMethod(value as SearchMethod)}
          disabled={isSearching}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select search method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear Search</SelectItem>
            <SelectItem value="binary">Binary Search</SelectItem>
            <SelectItem value="jump">Jump Search</SelectItem>
            <SelectItem value="interpolation">Interpolation Search</SelectItem>
            <SelectItem value="exponential">Exponential Search</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Controls */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isSearching}
          />
          <Button onClick={() => onSearch()} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Algorithm Description */}
      <div className="mt-4 p-3 bg-secondary/10 rounded-md">
        <h3 className="text-sm font-medium mb-2">
          {selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}{" "}
          Search
        </h3>
        <p className="text-sm text-muted-foreground">
          {getSearchAlgorithmDescription(selectedMethod)}
        </p>
      </div>
    </div>
  );
}
