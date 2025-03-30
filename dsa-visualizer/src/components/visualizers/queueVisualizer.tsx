import { useEffect, useRef } from "react";
import { QueueItem } from "@/hooks/useQueueOperations";
import * as d3 from "d3";

interface QueueVisualizerProps {
  data: QueueItem[];
}

export default function QueueVisualizer({ data }: QueueVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // dimensions
    const cellSize = 60;
    const spacing = 0;
    const arrayHeight = 80;
    const paddingX = 20;
    const paddingY = 50;

    // Create SVG container
    const svg = d3.select(svgRef.current);

    // Add array container with fixed positioning
    const arrayContainer = svg
      .append("g")
      .attr("transform", `translate(${paddingX}, ${paddingY})`);

    const totalWidth = Math.max(1, data.length) * (cellSize + spacing);

    //array outline
    arrayContainer
      .append("rect")
      .attr("width", Math.max(cellSize * 10, totalWidth))
      .attr("height", arrayHeight)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("rx", 4);

    //cell dividers for the array
    for (let i = 1; i < 10; i++) {
      arrayContainer
        .append("line")
        .attr("x1", i * cellSize)
        .attr("y1", 0)
        .attr("x2", i * cellSize)
        .attr("y2", arrayHeight)
        .attr("stroke", "white")
        .attr("stroke-dasharray", "4")
        .attr("stroke-width", 1);
    }

    //pointers
    if (data.length > 0) {
      // Front pointer
      arrayContainer
        .append("text")
        .attr("x", 0)
        .attr("y", -15)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .text("Front");

      arrayContainer
        .append("path")
        .attr("d", `M 30 -10 L 30 0`)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

      // Rear pointer
      arrayContainer
        .append("text")
        .attr("x", (data.length - 1) * cellSize)
        .attr("y", -15)
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .text("Rear");

      arrayContainer
        .append("path")
        .attr(
          "d",
          `M ${(data.length - 0.5) * cellSize} -10 L ${
            (data.length - 0.5) * cellSize
          } 0`
        )
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");
    }

    // Create cells
    const cells = arrayContainer
      .selectAll(".cell")
      .data(data, (d: any) => d.id)
      .join(
        // ENTER
        (enter) => {
          const enterSelection = enter
            .append("g")
            .attr("class", "cell")
            .attr("opacity", 0);

          // Position cells in array
          enterSelection.attr(
            "transform",
            (d, i) => `translate(${i * cellSize}, 0)`
          );

          // Create cell with rounded corners
          enterSelection
            .append("rect")
            .attr("width", cellSize)
            .attr("height", arrayHeight)
            .attr("fill", (d: QueueItem) => {
              switch (d.state) {
                case "inserting":
                  return "rgba(34, 197, 94, 0.2)"; // green
                case "highlighted":
                  return "rgba(234, 179, 8, 0.2)"; // yellow
                case "deleting":
                  return "rgba(239, 68, 68, 0.2)"; // red
                default:
                  return "rgba(255, 255, 255, 0.05)";
              }
            });

          // Add value text
          enterSelection
            .append("text")
            .attr("x", cellSize / 2)
            .attr("y", arrayHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .attr("class", "value-text")
            .text((d: QueueItem) => d.value);

          // Animate entry
          enterSelection.transition().duration(500).attr("opacity", 1);

          return enterSelection;
        },

        // UPDATE
        (update) => {
          // Update cell positions
          update
            .transition()
            .duration(300)
            .attr("transform", (d, i) => `translate(${i * cellSize}, 0)`);

          // Update cell based on state
          update
            .select("rect")
            .transition()
            .duration(300)
            .attr("fill", (d: QueueItem) => {
              switch (d.state) {
                case "inserting":
                  return "rgba(34, 197, 94, 0.2)"; // green
                case "highlighted":
                  return "rgba(234, 179, 8, 0.2)"; // yellow
                case "deleting":
                  return "rgba(239, 68, 68, 0.2)"; // red
                default:
                  return "rgba(255, 255, 255, 0.05)"; // slight highlight
              }
            });

          // Update text values
          update.select(".value-text").text((d: QueueItem) => d.value);

          return update;
        },

        // EXIT
        (exit) => {
          exit
            .select("rect")
            .transition()
            .duration(200)
            .attr("fill", "rgba(239, 68, 68, 0.2)"); // red

          //fade out
          exit
            .transition()
            .delay(200)
            .duration(300)
            .attr("opacity", 0)
            .remove();

          return exit;
        }
      );

    // Add arrowhead marker definition
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

    // Add empty state message if queue is empty
    if (data.length === 0) {
      arrayContainer
        .append("text")
        .attr("x", cellSize * 5)
        .attr("y", arrayHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .text("Empty Queue");
    }

    // Add queue capacity indicator
    arrayContainer
      .append("text")
      .attr("x", cellSize * 10 + 10)
      .attr("y", arrayHeight / 2)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .text(`Size: ${data.length}`);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-48 mt-4"
      viewBox="0 0 700 150"
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
