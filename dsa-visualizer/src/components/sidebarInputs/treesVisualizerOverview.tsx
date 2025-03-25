import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export default function TreesVisualizerOverview() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [newValue, setNewValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [deleteValue, setDeleteValue] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<string>("root");
  const [traversalResult, setTraversalResult] = useState<number[]>([]);

  const insertNode = () => {
    const value = parseInt(newValue);
    if (isNaN(value)) return;

    const newNode: TreeNode = { value, left: null, right: null };

    if (!root) {
      setRoot(newNode);
    } else {
      let current = root;
      let parent = null;

      while (current) {
        parent = current;
        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      if (parent) {
        if (value < parent.value) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      }
    }
    setNewValue("");
  };

  const searchNode = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;

    const result: number[] = [];
    const search = (node: TreeNode | null, target: number): boolean => {
      if (!node) return false;
      result.push(node.value);
      if (node.value === target) return true;
      if (target < node.value) return search(node.left, target);
      return search(node.right, target);
    };

    search(root, value);
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const deleteNode = () => {
    const value = parseInt(deleteValue);
    if (isNaN(value)) return;

    const deleteNodeHelper = (
      node: TreeNode | null,
      target: number
    ): TreeNode | null => {
      if (!node) return null;
      if (target < node.value) {
        node.left = deleteNodeHelper(node.left, target);
      } else if (target > node.value) {
        node.right = deleteNodeHelper(node.right, target);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let successor = node.right;
        while (successor.left) {
          successor = successor.left;
        }
        node.value = successor.value;
        node.right = deleteNodeHelper(node.right, successor.value);
      }
      return node;
    };

    setRoot(deleteNodeHelper(root, value));
    setDeleteValue("");
  };

  const inorderTraversal = () => {
    const result: number[] = [];
    const inorder = (node: TreeNode | null) => {
      if (!node) return;
      inorder(node.left);
      result.push(node.value);
      inorder(node.right);
    };
    inorder(root);
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const preorderTraversal = () => {
    const result: number[] = [];
    const preorder = (node: TreeNode | null) => {
      if (!node) return;
      result.push(node.value);
      preorder(node.left);
      preorder(node.right);
    };
    preorder(root);
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const postorderTraversal = () => {
    const result: number[] = [];
    const postorder = (node: TreeNode | null) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      result.push(node.value);
    };
    postorder(root);
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const levelOrderTraversal = () => {
    if (!root) return;
    const result: number[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const resetTree = () => {
    setRoot(null);
    setNewValue("");
    setSearchValue("");
    setDeleteValue("");
    setInsertPosition("root");
    setTraversalResult([]);
  };

  const displayTree = (node: TreeNode | null, level: number = 0): string => {
    if (!node) return "";
    const indent = "  ".repeat(level);
    return `${indent}${node.value}\n${displayTree(
      node.left,
      level + 1
    )}${displayTree(node.right, level + 1)}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tree Controls</CardTitle>
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
            <Button onClick={insertNode}>Insert</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Search value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={searchNode}>Search</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Value to delete"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
            />
            <Button onClick={deleteNode} variant="destructive">
              Delete
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              onClick={inorderTraversal}
              variant="outline"
              className="flex-1"
            >
              Inorder
            </Button>
            <Button
              onClick={preorderTraversal}
              variant="outline"
              className="flex-1"
            >
              Preorder
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={postorderTraversal}
              variant="outline"
              className="flex-1"
            >
              Postorder
            </Button>
            <Button
              onClick={levelOrderTraversal}
              variant="outline"
              className="flex-1"
            >
              Level Order
            </Button>
          </div>
        </div>

        <Separator />

        <Button onClick={resetTree} variant="outline" className="w-full">
          Reset Tree
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current Tree:</p>
          <pre className="text-sm font-mono mt-2">
            {displayTree(root) || "Empty Tree"}
          </pre>
          {traversalResult.length > 0 && (
            <p className="text-sm text-primary mt-2">
              Traversal Result: {traversalResult.join(" → ")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
