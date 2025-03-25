import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ArrayVisualizer, { ArrayItem } from "../visualizers/arrayVisualizer";
import { ArrayOperations } from "@/hooks/useArrayOperations";

interface ArrayVisualizerOverviewProps {
  arrayOps: ArrayOperations;
}

export default function ArrayVisualizerOverview({
  arrayOps,
}: ArrayVisualizerOverviewProps) {
  const [arraySize, setArraySize] = useState(0);
  const [newValue, setNewValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  console.log(arrayOps);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Array Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Array size"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
            <Button onClick={() => arrayOps.generateRandomArray(arraySize)}>
              Random
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button onClick={() => arrayOps.handlePush(Number(newValue))}>
              Push
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => arrayOps.handlePop()} variant="outline">
              Pop
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Index"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Value"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
            />
            <Button
              onClick={() =>
                arrayOps.handleInsert(Number(insertValue), Number(insertIndex))
              }
            >
              Insert
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Index to remove"
              value={removeIndex}
              onChange={(e) => setRemoveIndex(e.target.value)}
            />
            <Button
              onClick={() => arrayOps.handleRemove(Number(removeIndex))}
              variant="destructive"
            >
              Remove
            </Button>
          </div>
        </div>

        <Separator />

        <Button
          onClick={() => arrayOps.handleReset()}
          variant="outline"
          className="w-full"
        >
          Reset Array
        </Button>

        {/* <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current Array:</p>
          <p className="text-sm">
            {array.length > 0 ? array.join(", ") : "[]"}
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
}
