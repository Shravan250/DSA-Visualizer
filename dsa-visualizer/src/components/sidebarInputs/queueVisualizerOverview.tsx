import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { QueueOperations } from "@/lib/types/queue";
import { useState } from "react";

export default function QueueVisualizerOverview({
  queueOps,
}: {
  queueOps: QueueOperations;
}) {
  const [newValue, setNewValue] = useState<string>("");

  const handleEnqueue = () => {
    queueOps.enqueue(parseInt(newValue));
    setNewValue("");
  };

  const handleDequeue = () => {
    queueOps.dequeue();
  };

  const handlePeek = () => {
    queueOps.peek();
  };

  const handleReset = () => {
    queueOps.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Queue Controls</CardTitle>
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
            <Button onClick={handleEnqueue}>Enqueue</Button>
          </div>
          <Button
            onClick={handleDequeue}
            variant="destructive"
            className="w-full"
          >
            Dequeue
          </Button>
        </div>

        <Separator />

        <Button onClick={handlePeek} variant="outline" className="w-full">
          Peek
        </Button>

        <Separator />

        <Button onClick={handleReset} variant="destructive" className="w-full">
          Reset Queue
        </Button>
      </CardContent>
    </Card>
  );
}
