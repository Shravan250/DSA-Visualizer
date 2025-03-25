import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StackVisualizerOverview() {
  const [stack, setStack] = useState<number[]>([]);
  const [newValue, setNewValue] = useState<string>("");
  const [peekValue, setPeekValue] = useState<number | null>(null);

  const handlePush = () => {
    const value = parseInt(newValue);
    if (!isNaN(value)) {
      setStack([...stack, value]);
      setNewValue("");
    }
  };

  const handlePop = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1));
    }
  };

  const handlePeek = () => {
    if (stack.length > 0) {
      setPeekValue(stack[stack.length - 1]);
      setTimeout(() => setPeekValue(null), 2000); // Clear peek value after 2 seconds
    }
  };

  const handleReset = () => {
    setStack([]);
    setNewValue("");
    setPeekValue(null);
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
          <Button onClick={handlePop} variant="outline" className="w-full">
            Pop
          </Button>
        </div>

        <Separator />

        <Button onClick={handlePeek} variant="outline" className="w-full">
          Peek
        </Button>

        <Separator />

        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Stack
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current Stack:</p>
          <div className="flex flex-col-reverse gap-1">
            {stack.map((value, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  index === stack.length - 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {value}
              </div>
            ))}
            {stack.length === 0 && (
              <div className="text-sm text-muted-foreground">Empty Stack</div>
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
