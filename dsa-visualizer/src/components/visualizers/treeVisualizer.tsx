/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { FlatTreeNode } from "@/lib/types/tree";

interface TreeVisualizerProps {
  data: FlatTreeNode[];
}

export default function TreeVisualizer({ data }: TreeVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // If no data, show empty message
    if (data.length === 0) {
      const svg = d3.select(svgRef.current);
      svg
        .append("text")
        .attr("x", 400)
        .attr("y", 150)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .text("Empty Tree");
      return;
    }

    // Define dimensions
    const nodeRadius = 30;
    const horizontalSpacing = 80;
    const verticalSpacing = 100;
    const margin = { top: 60, right: 50, bottom: 50, left: 50 };

    // Create a tree structure based on parentId relationships
    const treeData = buildTreeHierarchy(data);

    // Calculate the depth and breadth of the tree for layout
    const maxLevel = Math.max(...data.map((d) => d.level));
    const numLeaves = data.filter((d) => {
      const hasChildren = data.some((child) => child.parentId === d.id);
      return !hasChildren;
    }).length;

    // Calculate the required width and height based on the tree size
    const width = Math.max(800, numLeaves * horizontalSpacing * 1.5);
    const height =
      (maxLevel + 1) * verticalSpacing + margin.top + margin.bottom;

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Create container for the tree
    const treeContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create a tree layout
    const treeLayout = d3
      .tree()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ])
      .nodeSize([horizontalSpacing, verticalSpacing])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.8));

    // Generate node positions
    const root = d3.hierarchy(treeData);
    treeLayout(root);

    // Create links first (so they appear behind nodes)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const links = treeContainer
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .attr("opacity", 1);

    // Create node groups
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nodeGroups = treeContainer
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .attr("opacity", 1);

    // For selecting nodes after transitions
    const nodeSelection = treeContainer.selectAll(".node");

    // Add circles for nodes
    nodeSelection
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => {
        const nodeData = data.find((n) => n.id === d.data.id);
        if (!nodeData) return "none";

        switch (nodeData.state) {
          case "inserting":
            return "rgba(34, 197, 94, 0.3)"; // green
          case "searching":
            return "rgba(59, 130, 246, 0.3)"; // blue
          case "removing":
            return "rgba(239, 68, 68, 0.3)"; // red
          case "highlighted":
            return "rgba(234, 179, 8, 0.3)"; // yellow
          case "visited":
            return "rgba(168, 85, 247, 0.3)"; // purple
          default:
            return "rgba(255, 255, 255, 0.1)"; // default
        }
      })
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(300);

    // Add text for node values
    nodeSelection
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text((d) => d.data.value);

    // Add arrowhead marker for links
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", nodeRadius + 5)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "white");

    // Helper function to build a hierarchical tree from flat data
    function buildTreeHierarchy(flatData: FlatTreeNode[]) {
      // Find the root node
      const rootNode = flatData.find((node) => node.parentId === null);
      if (!rootNode) return { id: "", value: 0, children: [] };

      // Function to find children of a node
      const findChildren = (nodeId: string) => {
        return flatData
          .filter((node) => node.parentId === nodeId)
          .map((childNode) => ({
            id: childNode.id,
            value: childNode.value,
            state: childNode.state,
            children: findChildren(childNode.id),
          }));
      };

      // Build the tree
      return {
        id: rootNode.id,
        value: rootNode.value,
        state: rootNode.state,
        children: findChildren(rootNode.id),
      };
    }
  }, [data]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-96 mt-4 border border-gray-700"
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
