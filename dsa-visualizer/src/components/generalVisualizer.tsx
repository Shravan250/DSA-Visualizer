// GeneralVisualizer.tsx
import React from "react";
import ArrayVisualizer from "./visualizers/arrayVisualizer";
import type { ArrayOperations } from "@/hooks/useArrayOperations";

interface GeneralVisualizerProps {
  selectedStrategy: string;
  arrayOps: ArrayOperations;
}

export function GeneralVisualizer({
  selectedStrategy,
  arrayOps,
}: GeneralVisualizerProps) {
  // Map strategy keys directly to visualizer components.
  const strategyComponents: { [key: string]: JSX.Element } = {
    array: <ArrayVisualizer data={arrayOps.data} />,
    // linkedList: <LinkedListVisualizer data={linkedListOps.data} />,
    // stack: <StackVisualizer data={stackOps.data} />,
    // queue: <QueueVisualizer data={queueOps.data} />,
    // trees: <TreesVisualizer data={treesOps.data} />,
    // graph: <GraphVisualizer data={graphOps.data} />,
    // sorting: <SortingVisualizer data={sortingOps.data} />,
    // searching: <SearchingVisualizer data={searchingOps.data} />,
  };

  return (
    <div className="w-full h-full">
      {selectedStrategy ? (
        strategyComponents[selectedStrategy] || (
          <div className="text-center text-gray-500">
            Strategy not implemented
          </div>
        )
      ) : (
        <div className="text-center text-gray-500">
          Please select a data structure or algorithm from the sidebar.
        </div>
      )}
    </div>
  );
}
