import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchMethod } from "@/lib/types/searching";
import { useEffect, useState } from "react";
import { SearchControls } from "../controls/SearchControls";

export default function SearchingVisualizerOverview() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<SearchMethod>("linear");
  const [arraySize, setArraySize] = useState<string>("10");
  const [stepDelay, setStepDelay] = useState<number>(500);
  // const [refreshVisualizer, setRefreshVisualizer] = useState<boolean>(false);

  // const {
  //   array,
  //   currentIndex,
  //   visitedIndices,
  //   foundIndex,
  //   isSearching,
  //   searchResult,
  //   generateArray,
  //   performSearch,
  // } = useSearchOperations(stepDelay);

  // const handleGenerateArray = useCallback(() => {
  //   const size = parseInt(arraySize);
  //   if (isNaN(size) || size <= 0 || size > 100) return;
  //   generateArray(size, selectedMethod);
  //   setRefreshVisualizer(true);
  //   setTimeout(() => setRefreshVisualizer(false), 100);
  // }, [arraySize, selectedMethod, generateArray]);

  // const handleSearch = useCallback(() => {
  //   const value = parseInt(searchValue);
  //   if (isNaN(value) || isSearching || array.length === 0) return;
  //   performSearch(value, selectedMethod);
  // }, [searchValue, isSearching, array.length, selectedMethod, performSearch]);

  const handleGenerateArray = () => {
    console.log("generateArray");
  };

  const handleSearch = () => {
    console.log("search");
  };

  useEffect(() => {
    handleGenerateArray();
  }, [selectedMethod, handleGenerateArray]);

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Searching Algorithm Visualizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchControls
            arraySize={arraySize}
            setArraySize={setArraySize}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            stepDelay={stepDelay}
            setStepDelay={setStepDelay}
            onGenerateArray={handleGenerateArray}
            onSearch={handleSearch}
            isSearching={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
