import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StackOperations } from "@/hooks/useStackOperations";
import { useState } from "react";

interface StackVisualizerOverviewProps {
  stackOps: StackOperations;
}

export default function StackVisualizerOverview({
  stackOps,
}: StackVisualizerOverviewProps) {
  const [stack, setStack] = useState<number[]>([]);
  const [newValue, setNewValue] = useState<string>("");
  const [peekValue, setPeekValue] = useState<number | null>(null);

  const handlePush = () => {
    stackOps.push(parseInt(newValue));
  };

  const handlePop = () => {
    stackOps.pop();
  };

  const handlePeek = () => {
    stackOps.peek();
  };

  const handleReset = () => {
    stackOps.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stack Controls</CardTitle>
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
          <Button onClick={handlePop} variant="destructive" className="w-full">
            Pop
          </Button>
        </div>

        <Separator />

        <Button onClick={handlePeek} variant="outline" className="w-full">
          Peek
        </Button>

        <Separator />

        <Button onClick={handleReset} variant="destructive" className="w-full">
          Reset Stack
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          {stack.length === 0 && (
            <div className="text-sm text-muted-foreground">Empty Stack</div>
          )}

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
