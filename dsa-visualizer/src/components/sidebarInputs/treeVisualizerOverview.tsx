import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TreeOperations } from "@/hooks/useTreeOperations";
import { useState } from "react";

export default function TreeVisualizerOverview({
  treeOps,
}: {
  treeOps: TreeOperations;
}) {
  const [value, setValue] = useState<string>("");
  const [traversalResult, setTraversalResult] = useState<{
    type: string;
    result: number[];
  } | null>(null);

  const handleInsert = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      treeOps.insert(num);
      setValue("");
    }
  };

  const handleRemove = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      treeOps.remove(num);
      setValue("");
    }
  };

  const handleSearch = () => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      treeOps.search(num);
      setValue("");
    }
  };

  const handleTraversal = async (
    type: string,
    operation: () => Promise<number[] | undefined>
  ) => {
    if (treeOps.isOperationInProgress) return;
    const result = await operation();
    if (result) {
      setTraversalResult({ type, result });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Binary Search Tree Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              onClick={handleInsert}
              disabled={treeOps.isOperationInProgress}
            >
              Insert
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            onClick={handleRemove}
            variant="destructive"
            className="flex-1"
            disabled={treeOps.isOperationInProgress}
          >
            Remove
          </Button>
          <Button
            onClick={handleSearch}
            variant="outline"
            className="flex-1"
            disabled={treeOps.isOperationInProgress}
          >
            Search
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() =>
                handleTraversal("Inorder", treeOps.inorderTraversal)
              }
              variant="outline"
              disabled={treeOps.isOperationInProgress}
            >
              Inorder
            </Button>
            <Button
              onClick={() =>
                handleTraversal("Preorder", treeOps.preorderTraversal)
              }
              variant="outline"
              disabled={treeOps.isOperationInProgress}
            >
              Preorder
            </Button>
            <Button
              onClick={() =>
                handleTraversal("Postorder", treeOps.postorderTraversal)
              }
              variant="outline"
              disabled={treeOps.isOperationInProgress}
            >
              Postorder
            </Button>
            <Button
              onClick={() =>
                handleTraversal("Level Order", treeOps.levelOrderTraversal)
              }
              variant="outline"
              disabled={treeOps.isOperationInProgress}
            >
              Level Order
            </Button>
          </div>

          {/* Traversal Result Display */}
          {traversalResult && (
            <div className="mt-4 p-3 bg-secondary/20 rounded-md">
              <p className="text-sm font-medium mb-1">
                {traversalResult.type} Traversal Result:
              </p>
              <p className="text-sm font-mono">
                [{traversalResult.result.join(", ")}]
              </p>
            </div>
          )}
        </div>

        <Separator />

        <Button
          onClick={() => {
            treeOps.reset();
            setTraversalResult(null);
          }}
          variant="destructive"
          className="w-full"
          disabled={treeOps.isOperationInProgress}
        >
          Reset Tree
        </Button>

        {/* Operation Status */}
        {treeOps.isOperationInProgress && (
          <div className="text-sm text-muted-foreground text-center animate-pulse">
            Operation in progress...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
