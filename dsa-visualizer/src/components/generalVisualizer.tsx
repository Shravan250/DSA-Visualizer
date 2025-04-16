// GeneralVisualizer.tsx
import type { JSX } from "react";
import { TreeOperations } from "@/hooks/useTreeOperations";
import { ArrayOperations } from "@/lib/types/array";
import { LinkedListOperations } from "@/lib/types/linkedList";
import { QueueOperations } from "@/lib/types/queue";
import { StackOperations } from "@/lib/types/stack";
import ArrayVisualizer from "./visualizers/arrayVisualizer";
import LinkedListVisualizer from "./visualizers/linkedListVisualizer";
import QueueVisualizer from "./visualizers/queueVisualizer";
import StackVisualizer from "./visualizers/stackVisualizer";
import TreesVisualizer from "./visualizers/treeVisualizer";
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
    </div>
  );
}
