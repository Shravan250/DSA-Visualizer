import React, { useEffect, useRef } from "react";
import { StackItem } from "@/hooks/useStackOperations";
import * as d3 from "d3";

interface StackVisualizerProps {
  data: StackItem[];
}

export default function StackVisualizer({ data }: StackVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Define dimensions
    const itemWidth = 100;
    const itemHeight = 50;
    const itemSpacing = 10;
    const padding = 50; // Padding around the stack

    // Calculate total height needed
    const totalHeight = data.length * (itemHeight + itemSpacing) + padding * 2;
    // Calculate center position for x-axis
    const centerX = Math.max(800, data.length * 130) / 2 - itemWidth / 2;

    // Create SVG container
    const svg = d3.select(svgRef.current);

    // Add stack base
    svg
      .append("rect")
      .attr("x", centerX)
      .attr("y", totalHeight - padding)
      .attr("width", itemWidth)
      .attr("height", 5)
      .attr("fill", "white");

    // Create stack container
    const stackContainer = svg
      .append("g")
      .attr("transform", `translate(${centerX}, 0)`);

    // Create stack items with animations
    const stackItems = stackContainer
      .selectAll("g.stack-item")
      .data(data, (d: any) => d.id)
      .join(
        // ENTER
        (enter) => {
          const enterSelection = enter
            .append("g")
            .attr("class", "stack-item")
            .attr("transform", `translate(0, -${itemHeight})`)
            .style("opacity", 0);

          // Rectangle for stack item
          enterSelection
            .append("rect")
            .attr("width", itemWidth)
            .attr("height", itemHeight)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .transition()
            .duration(500)
            .attr("fill", (d: StackItem) => {
              switch (d.state) {
                case "inserting":
                  return "rgba(34, 197, 94, 0.2)"; // green
                case "highlighted":
                  return "rgba(234, 179, 8, 0.2)"; // yellow
                case "deleting":
                  return "rgba(239, 68, 68, 0.2)"; // red
                default:
                  return "rgba(59, 130, 246, 0.2)"; // blue
              }
            });

          // Text value
          enterSelection
            .append("text")
            .attr("x", itemWidth / 2)
            .attr("y", itemHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .text((d: StackItem) => d.value);

          // Animate enter
          enterSelection
            .transition()
            .duration(500)
            .attr(
              "transform",
              (d, i) =>
                `translate(0, ${
                  totalHeight - padding - (i + 1) * (itemHeight + itemSpacing)
                })`
            )
            .style("opacity", 1);

          return enterSelection;
        },
        // UPDATE
        (update) => {
          update
            .transition()
            .duration(500)
            .attr(
              "transform",
              (d, i) =>
                `translate(0, ${
                  totalHeight - padding - (i + 1) * (itemHeight + itemSpacing)
                })`
            )
            .select("rect")
            .attr("fill", (d: StackItem) => {
              switch (d.state) {
                case "inserting":
                  return "rgba(34, 197, 94, 0.2)";
                case "highlighted":
                  return "rgba(234, 179, 8, 0.2)";
                case "deleting":
                  return "rgba(239, 68, 68, 0.2)";
                default:
                  return "rgba(59, 130, 246, 0.2)";
              }
            });

          return update;
        },
        // EXIT
        (exit) => {
          exit
            .transition()
            .duration(500)
            .attr("transform", `translate(0, -${itemHeight})`)
            .style("opacity", 0)
            .remove();

          return exit;
        }
      );
  }, [data]);

  // Calculate dynamic dimensions for viewBox
  const width = Math.max(800, data.length * 130);
  const height = Math.max(400, data.length * 100);

  return (
    <svg
      ref={svgRef}
      className="w-full min-h-screen border border-red-500"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
