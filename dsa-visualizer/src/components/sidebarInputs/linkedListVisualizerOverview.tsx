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

interface Node {
  value: number;
  next: Node | null;
}

export default function LinkedListVisualizerOverview() {
  const [head, setHead] = useState<Node | null>(null);
  const [newValue, setNewValue] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<string>("");
  const [deleteValue, setDeleteValue] = useState<string>("");

  const insertAtHead = () => {
    const value = parseInt(newValue);
    if (!isNaN(value)) {
      const newNode: Node = { value, next: head };
      setHead(newNode);
      setNewValue("");
    }
  };

  const insertAtTail = () => {
    const value = parseInt(newValue);
    if (!isNaN(value)) {
      const newNode: Node = { value, next: null };
      if (!head) {
        setHead(newNode);
      } else {
        let current = head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
      setNewValue("");
    }
  };

  const insertAtPosition = () => {
    const value = parseInt(newValue);
    const position = parseInt(insertPosition);
    if (!isNaN(value) && !isNaN(position) && position >= 0) {
      const newNode: Node = { value, next: null };
      if (position === 0) {
        newNode.next = head;
        setHead(newNode);
      } else {
        let current = head;
        let prev = null;
        let count = 0;
        while (current && count < position) {
          prev = current;
          current = current.next;
          count++;
        }
        if (prev) {
          newNode.next = current;
          prev.next = newNode;
        }
      }
      setNewValue("");
      setInsertPosition("");
    }
  };

  const deleteByValue = () => {
    const value = parseInt(deleteValue);
    if (!isNaN(value)) {
      if (head?.value === value) {
        setHead(head.next);
      } else {
        let current = head;
        let prev = null;
        while (current && current.value !== value) {
          prev = current;
          current = current.next;
        }
        if (prev && current) {
          prev.next = current.next;
        }
      }
      setDeleteValue("");
    }
  };

  const deleteHead = () => {
    if (head) {
      setHead(head.next);
    }
  };

  const deleteTail = () => {
    if (!head || !head.next) {
      setHead(null);
    } else {
      let current = head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
  };

  const resetList = () => {
    setHead(null);
    setNewValue("");
    setInsertPosition("");
    setDeleteValue("");
  };

  const displayList = () => {
    let result = "";
    let current = head;
    while (current) {
      result += current.value;
      if (current.next) {
        result += " → ";
      }
      current = current.next;
    }
    return result || "Empty List";
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
            <Button onClick={insertAtHead}>Insert at Head</Button>
          </div>
          <Button onClick={insertAtTail} variant="outline" className="w-full">
            Insert at Tail
          </Button>
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
            <Button onClick={insertAtPosition}>Insert at Position</Button>
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
            <Button onClick={deleteByValue} variant="destructive">
              Delete by Value
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={deleteHead} variant="outline" className="flex-1">
              Delete Head
            </Button>
            <Button onClick={deleteTail} variant="outline" className="flex-1">
              Delete Tail
            </Button>
          </div>
        </div>

        <Separator />

        <Button onClick={resetList} variant="outline" className="w-full">
          Reset List
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current List:</p>
          <p className="text-sm">{displayList()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
