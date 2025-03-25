import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function QueueVisualizerOverview() {
  const [queue, setQueue] = useState<number[]>([]);
  const [newValue, setNewValue] = useState<string>("");
  const [peekValue, setPeekValue] = useState<number | null>(null);

  const handleEnqueue = () => {
    const value = parseInt(newValue);
    if (!isNaN(value)) {
      setQueue([...queue, value]);
      setNewValue("");
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
    }
  };

  const handlePeek = () => {
    if (queue.length > 0) {
      setPeekValue(queue[0]);
      setTimeout(() => setPeekValue(null), 2000); // Clear peek value after 2 seconds
    }
  };

  const handleReset = () => {
    setQueue([]);
    setNewValue("");
    setPeekValue(null);
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
          <Button onClick={handleDequeue} variant="outline" className="w-full">
            Dequeue
          </Button>
        </div>

        <Separator />

        <Button onClick={handlePeek} variant="outline" className="w-full">
          Peek
        </Button>

        <Separator />

        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Queue
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current Queue:</p>
          <div className="flex gap-1">
            {queue.map((value, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {value}
              </div>
            ))}
            {queue.length === 0 && (
              <div className="text-sm text-muted-foreground">Empty Queue</div>
            )}
          </div>
          {peekValue !== null && (
            <p className="text-sm text-primary mt-2">
              Peeked value: {peekValue}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
