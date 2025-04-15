import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LinkedListOperations } from "@/hooks/useLinkedListOperations";
import { useState } from "react";

interface Node {
  value: number;
  next: Node | null;
}

export default function LinkedListVisualizerOverview({
  linkedListOps,
}: {
  linkedListOps: LinkedListOperations;
}) {
  const [newValue, setNewValue] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<string>("");
  const [removePosition, setRemovePosition] = useState<number>(0);

  const handleInsert = () => {
    const value = parseInt(newValue);
    const position = parseInt(insertPosition);
    if (!isNaN(value) && !isNaN(position)) {
      linkedListOps.handleInsert(value, position);
      setNewValue("");
      setInsertPosition("");
    }
  };

  const handlePush = () => {
    const value = parseInt(newValue);
    if (!isNaN(value)) {
      linkedListOps.handlePush(value);
      setNewValue("");
    }
  };

  const handleRemove = () => {
    linkedListOps.handleRemove(removePosition);
    setRemovePosition(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Linked List Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button onClick={handlePush}>Push</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Position"
              value={insertPosition}
              onChange={(e) => setInsertPosition(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button onClick={handleInsert}>Insert</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Index"
              value={removePosition}
              onChange={(e) => setRemovePosition(parseInt(e.target.value))}
            />
            <Button onClick={handleRemove} variant="destructive">
              Remove
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            onClick={() => linkedListOps.handlePop()}
            variant="destructive"
            className="flex-1"
          >
            Pop
          </Button>
          <Button
            onClick={() => linkedListOps.handleReset()}
            variant="outline"
            className="flex-1"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
