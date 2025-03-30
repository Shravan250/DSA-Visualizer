// GeneralVisualizer.tsx
import React from "react";
import ArrayVisualizer from "./visualizers/arrayVisualizer";
import type { ArrayOperations } from "@/hooks/useArrayOperations";
import LinkedListVisualizer from "./visualizers/linkedListVisualizer";
import { LinkedListOperations } from "@/hooks/useLinkedListOperations";
import TestComponent from "./testComponent";
import StackVisualizer from "./visualizers/stackVisualizer";
import { StackOperations } from "@/hooks/useStackOperations";
import { QueueOperations } from "@/hooks/useQueueOperations";
import QueueVisualizer from "./visualizers/queueVisualizer";
import TreesVisualizer from "./visualizers/treeVisualizer";
import { TreeOperations } from "@/hooks/useTreeOperations";
interface GeneralVisualizerProps {
  selectedStrategy: string;
  arrayOps: ArrayOperations;
  linkedListOps: LinkedListOperations;
  stackOps: StackOperations;
  queueOps: QueueOperations;
  treeOps: TreeOperations;
}

export function GeneralVisualizer({
  selectedStrategy,
  arrayOps,
  linkedListOps,
  stackOps,
  queueOps,
  treeOps,
}: GeneralVisualizerProps) {
  // Map strategy keys directly to visualizer components.
  const strategyComponents: { [key: string]: JSX.Element } = {
    array: <ArrayVisualizer data={arrayOps.data} />,
    linkedList: <LinkedListVisualizer data={linkedListOps.data} />,
    stack: <StackVisualizer data={stackOps.data} />,
    queue: <QueueVisualizer data={queueOps.data} />,
    trees: <TreesVisualizer data={treeOps.data} />,
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
      {/* <TestComponent /> */}
    </div>
  );
}
