import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface GraphNode {
  value: number;
  edges: { target: number; weight: number }[];
}

export default function GraphVisualizerOverview() {
  const [vertices, setVertices] = useState<GraphNode[]>([]);
  const [newVertex, setNewVertex] = useState<string>("");
  const [sourceVertex, setSourceVertex] = useState<string>("");
  const [targetVertex, setTargetVertex] = useState<string>("");
  const [edgeWeight, setEdgeWeight] = useState<string>("");
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [startVertex, setStartVertex] = useState<string>("");

  const addVertex = () => {
    const value = parseInt(newVertex);
    if (isNaN(value)) return;

    if (!vertices.find((v) => v.value === value)) {
      setVertices([...vertices, { value, edges: [] }]);
      setNewVertex("");
    }
  };

  const addEdge = () => {
    const source = parseInt(sourceVertex);
    const target = parseInt(targetVertex);
    const weight = parseInt(edgeWeight) || 1;

    if (isNaN(source) || isNaN(target)) return;

    const newVertices = vertices.map((vertex) => {
      if (vertex.value === source) {
        return {
          ...vertex,
          edges: [...vertex.edges, { target, weight }],
        };
      }
      return vertex;
    });

    setVertices(newVertices);
    setSourceVertex("");
    setTargetVertex("");
    setEdgeWeight("");
  };

  const bfs = () => {
    const start = parseInt(startVertex);
    if (isNaN(start)) return;

    const result: number[] = [];
    const visited = new Set<number>();
    const queue: number[] = [start];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (!visited.has(current)) {
        visited.add(current);
        result.push(current);
        const vertex = vertices.find((v) => v.value === current);
        if (vertex) {
          vertex.edges.forEach((edge) => {
            if (!visited.has(edge.target)) {
              queue.push(edge.target);
            }
          });
        }
      }
    }

    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const dfs = () => {
    const start = parseInt(startVertex);
    if (isNaN(start)) return;

    const result: number[] = [];
    const visited = new Set<number>();

    const dfsHelper = (vertex: number) => {
      if (visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex);
      const currentVertex = vertices.find((v) => v.value === vertex);
      if (currentVertex) {
        currentVertex.edges.forEach((edge) => {
          dfsHelper(edge.target);
        });
      }
    };

    dfsHelper(start);
    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const dijkstra = () => {
    const start = parseInt(startVertex);
    if (isNaN(start)) return;

    const distances = new Map<number, number>();
    const visited = new Set<number>();
    const result: number[] = [];

    vertices.forEach((vertex) => {
      distances.set(vertex.value, Infinity);
    });
    distances.set(start, 0);

    while (visited.size < vertices.length) {
      let minDistance = Infinity;
      let currentVertex = -1;

      distances.forEach((distance, vertex) => {
        if (!visited.has(vertex) && distance < minDistance) {
          minDistance = distance;
          currentVertex = vertex;
        }
      });

      if (currentVertex === -1) break;

      visited.add(currentVertex);
      result.push(currentVertex);

      const vertex = vertices.find((v) => v.value === currentVertex);
      if (vertex) {
        vertex.edges.forEach((edge) => {
          const newDistance = distances.get(currentVertex)! + edge.weight;
          if (newDistance < distances.get(edge.target)!) {
            distances.set(edge.target, newDistance);
          }
        });
      }
    }

    setTraversalResult(result);
    setTimeout(() => setTraversalResult([]), 3000);
  };

  const resetGraph = () => {
    setVertices([]);
    setNewVertex("");
    setSourceVertex("");
    setTargetVertex("");
    setEdgeWeight("");
    setStartVertex("");
    setTraversalResult([]);
  };

  const displayGraph = () => {
    if (vertices.length === 0) return "Empty Graph";
    return vertices
      .map(
        (vertex) =>
          `${vertex.value} -> ${vertex.edges
            .map((edge) => `${edge.target}(${edge.weight})`)
            .join(", ")}`
      )
      .join("\n");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Graph Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="New vertex"
              value={newVertex}
              onChange={(e) => setNewVertex(e.target.value)}
            />
            <Button onClick={addVertex}>Add Vertex</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Source vertex"
              value={sourceVertex}
              onChange={(e) => setSourceVertex(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Target vertex"
              value={targetVertex}
              onChange={(e) => setTargetVertex(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Weight"
              value={edgeWeight}
              onChange={(e) => setEdgeWeight(e.target.value)}
            />
            <Button onClick={addEdge}>Add Edge</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Start vertex"
              value={startVertex}
              onChange={(e) => setStartVertex(e.target.value)}
            />
            <Button onClick={bfs} variant="outline" className="flex-1">
              BFS
            </Button>
            <Button onClick={dfs} variant="outline" className="flex-1">
              DFS
            </Button>
          </div>
          <Button onClick={dijkstra} variant="outline" className="w-full">
            Dijkstra
          </Button>
        </div>

        <Separator />

        <Button onClick={resetGraph} variant="outline" className="w-full">
          Reset Graph
        </Button>

        <div className="mt-4 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Current Graph:</p>
          <pre className="text-sm font-mono mt-2">{displayGraph()}</pre>
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
