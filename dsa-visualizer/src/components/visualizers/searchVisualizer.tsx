import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SearchVisualizerProps } from "@/lib/types/searching";

export default function SearchVisualizer({
  array,
  searchValue,
  currentIndex = -1,
  visitedIndices = [],
  foundIndex = -1,
  shouldRefresh = false,
  searchResult = null,
}: SearchVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prevArrayRef = useRef<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Only update visualization if array has changed or refresh is requested
    const arrayChanged =
      JSON.stringify(array) !== JSON.stringify(prevArrayRef.current);

    if (!shouldRefresh && !arrayChanged && prevArrayRef.current.length > 0) {
      return;
    }

    // Update prevArray reference
    prevArrayRef.current = [...array];

    if (!svgRef.current || array.length === 0) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Define dimensions
    const margin = { top: 50, right: 30, bottom: 50, left: 50 };
    const width = svgRef.current.clientWidth || 800;
    const height = 300;
    const barWidth = Math.min(
      50,
      (width - margin.left - margin.right) / array.length - 4
    );

    // Find min and max values to scale the bars appropriately
    const maxValue = Math.max(...array);

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Create a container for the visualization
    const container = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scale for bar heights
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([height - margin.top - margin.bottom, 0]);

    // Create bars for each element in the array
    const bars = container
      .selectAll(".bar")
      .data(array)
      .enter()
      .append("g")
      .attr("class", "bar")
      .attr("transform", (d, i) => {
        const x = i * (barWidth + 4);
        return `translate(${x}, 0)`;
      });

    // Add rectangles for bars
    bars
      .append("rect")
      .attr("width", barWidth)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - margin.top - margin.bottom - yScale(d))
      .attr("rx", 3)
      .attr("fill", (d, i) => {
        if (i === foundIndex) return "rgba(34, 197, 94, 0.7)"; // Found (green)
        if (i === currentIndex) return "rgba(59, 130, 246, 0.7)"; // Current (blue)
        if (visitedIndices.includes(i)) return "rgba(168, 85, 247, 0.4)"; // Visited (purple)
        return "rgba(255, 255, 255, 0.3)"; // Default (white with transparency)
      })
      .attr("stroke", (d, i) => {
        if (i === foundIndex) return "#22c55e"; // Found (green)
        if (i === currentIndex) return "#3b82f6"; // Current (blue)
        if (visitedIndices.includes(i)) return "#a855f7"; // Visited (purple)
        return "white"; // Default
      })
      .attr("stroke-width", 1)
      .on("mouseover", (event, d) => {
        const index = array.indexOf(d);
        setHoveredIndex(index);
      })
      .on("mouseout", () => {
        setHoveredIndex(null);
      });

    // Add text for array values
    bars
      .append("text")
      .attr("x", barWidth / 2)
      .attr("y", (d) => yScale(d) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text((d) => d);

    // Add index labels
    bars
      .append("text")
      .attr("x", barWidth / 2)
      .attr("y", height - margin.top - margin.bottom + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text((d, i) => i);

    // Add a legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - 200}, 20)`);

    // Current element
    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "rgba(59, 130, 246, 0.7)")
      .attr("stroke", "#3b82f6")
      .attr("rx", 2);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 12)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text("Current Element");

    // Visited element
    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "rgba(168, 85, 247, 0.4)")
      .attr("stroke", "#a855f7")
      .attr("rx", 2)
      .attr("y", 20);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 32)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text("Visited Element");

    // Found element
    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "rgba(34, 197, 94, 0.7)")
      .attr("stroke", "#22c55e")
      .attr("rx", 2)
      .attr("y", 40);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 52)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text("Found Element");

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(
        `Search Visualization${
          searchValue !== undefined ? `: Looking for ${searchValue}` : ""
        }`
      );

    // Display search results if available
    if (searchResult) {
      const resultText = searchResult.found
        ? `Found at index ${foundIndex} in ${searchResult.time.toFixed(2)}ms (${
            searchResult.comparisons
          } comparisons)`
        : `Not found after ${
            searchResult.comparisons
          } comparisons (${searchResult.time.toFixed(2)}ms)`;

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 15)
        .attr("text-anchor", "middle")
        .attr("fill", searchResult.found ? "#22c55e" : "#ef4444")
        .attr("font-size", "14px")
        .text(resultText);
    }

    // Display tooltip for hovered element
    if (hoveredIndex !== null) {
      const hoveredBar = bars.filter((d, i) => i === hoveredIndex);
      const barData = hoveredBar.datum();

      container
        .append("rect")
        .attr("x", hoveredIndex * (barWidth + 4) - 10)
        .attr("y", yScale(barData) - 40)
        .attr("width", 80)
        .attr("height", 30)
        .attr("fill", "rgba(0, 0, 0, 0.7)")
        .attr("rx", 5);

      container
        .append("text")
        .attr("x", hoveredIndex * (barWidth + 4) + barWidth / 2)
        .attr("y", yScale(barData) - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text(`Index: ${hoveredIndex}`);

      container
        .append("text")
        .attr("x", hoveredIndex * (barWidth + 4) + barWidth / 2)
        .attr("y", yScale(barData) - 20 + 15)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text(`Value: ${barData}`);
    }
  }, [
    array,
    searchValue,
    currentIndex,
    visitedIndices,
    foundIndex,
    shouldRefresh,
    searchResult,
    hoveredIndex,
  ]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-64 mt-4 border border-gray-700 rounded-md"
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
