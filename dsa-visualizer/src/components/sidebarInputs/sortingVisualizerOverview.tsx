import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SortMethod } from "@/lib/types/sorting";
import { useState } from "react";
import { SortControls } from "../controls/SortControls";

export default function SortingVisualizerOverview() {
  const [selectedMethod, setSelectedMethod] = useState<SortMethod>("bubble");
  const [arraySize, setArraySize] = useState<string>("10");
  const [stepDelay, setStepDelay] = useState<number>(500);
  // const [refreshVisualizer, setRefreshVisualizer] = useState<boolean>(false);

  // const {
  //   array,
  //   currentIndex,
  //   swapIndices,
  //   sortedIndices,
  //   isSorting,
  //   sortResult,
  //   generateArray,
  //   performSort,
  // } = useSortOperations(stepDelay);

  // const handleGenerateArray = useCallback(() => {
  //   const size = parseInt(arraySize);
  //   if (isNaN(size) || size <= 0 || size > 100) return;
  //   generateArray(size);
  //   setRefreshVisualizer(true);
  //   setTimeout(() => setRefreshVisualizer(false), 100);
  // }, [arraySize, generateArray]);

  // const handleSort = useCallback(() => {
  //   if (array.length === 0 || isSorting) return;
  //   performSort(selectedMethod);
  // }, [array.length, isSorting, selectedMethod, performSort]);

  // useEffect(() => {
  //   handleGenerateArray();
  // }, [handleGenerateArray]);

  const handleGenerateArray = () => {
    console.log("generateArray");
  };

  const handleSort = () => {
    console.log("sort");
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sorting Algorithm Visualizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SortControls
            arraySize={arraySize}
            setArraySize={setArraySize}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            stepDelay={stepDelay}
            setStepDelay={setStepDelay}
            onGenerateArray={handleGenerateArray}
            onSort={handleSort}
            isSorting={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
