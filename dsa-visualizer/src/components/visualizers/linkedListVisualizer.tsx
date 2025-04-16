import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { LinkedListItem } from "@/lib/types/linkedList";

interface LinkedListVisualizerProps {
  data: LinkedListItem[];
}

export default function LinkedListVisualizer({
  data,
}: LinkedListVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current);

    // Define dimensions
    const nodeWidth = 100;
    const nodeHeight = 50;
    const spacing = 130;

    // Create node groups
    const nodes = svg
      .selectAll(".node")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d, i) => `translate(${10 + i * spacing}, 50)`);

    // Add rectangles for nodes
    nodes
      .append("rect")
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(500)
      .attr("fill", (d) => {
        switch (d.state) {
          case "inserting":
            return "rgba(34, 197, 94, 0.2)"; // green
          case "deleting":
            return "rgba(239, 68, 68, 0.2)"; // red
          case "traversing":
            return "rgba(59, 130, 246, 0.2)"; // blue
          default:
            return "none";
        }
      });

    // Add value text
    nodes
      .append("text")
      .attr("x", nodeWidth / 2 - 25)
      .attr("y", nodeHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .text((d) => d.value);

    // Add vertical divider lines
    nodes
      .append("line")
      .attr("x1", nodeWidth / 2)
      .attr("y1", 0)
      .attr("x2", nodeWidth / 2)
      .attr("y2", nodeHeight)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Add connecting arrows
    nodes
      .filter((d, i) => i < data.length - 1)
      .append("path")
      .attr(
        "d",
        `M ${nodeWidth - 25} ${nodeHeight / 2} L ${spacing - 2} ${
          nodeHeight / 2
        }`
      )
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // Add arrowhead marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "white");
  }, [data]);

  return (
    <svg
      ref={svgRef}
      className="w-full min-h-screen border border-red-500"
      viewBox={`0 0 ${Math.max(800, data.length * 130)} 200`}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
