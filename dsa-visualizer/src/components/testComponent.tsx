import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TestComponent() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the SVG container
    const svg = d3.select(svgRef.current);

    // Create data for rectangles
    const rectangles = [
      { item: 1, x: 10, y: 50 },
      { item: 2, x: 140, y: 50 },
      { item: 3, x: 270, y: 50 },
      { item: 4, x: 400, y: 50 },
      { item: 5, x: 530, y: 50 },
    ];

    // Draw rectangles
    svg
      .selectAll("rect")
      .data(rectangles)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Draw text
    svg
      .selectAll("text")
      .data(rectangles)
      .enter()
      .append("text")
      .text((d) => d.item)
      .attr("x", (d) => d.x + 20)
      .attr("y", (d) => d.y + 30)
      .attr("fill", "white")
      .attr("font-weight", "bold");

    // Draw vertical lines
    svg
      .selectAll(".vertical-line")
      .data(rectangles)
      .enter()
      .append("line")
      .attr("x1", (d) => d.x + 50)
      .attr("y1", (d) => d.y)
      .attr("x2", (d) => d.x + 50)
      .attr("y2", (d) => d.y + 50)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Draw connecting lines (paths)
    svg
      .selectAll(".connecting-line")
      .data(rectangles.slice(0, -1))
      .enter()
      .append("path")
      .attr("d", (d) => `M ${d.x + 75} ${d.y + 25} L ${d.x + 130} ${d.y + 25}`)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Draw the arrow
    // svg
    //   .append("path")
    //   .attr("d", (d) => `M ${d.x + 120} ${d.y + 15}`)
    //   .attr("fill", "white")
    //   .attr("stroke", "white");
  }, []);

  return (
    <svg ref={svgRef} className="w-full min-h-screen border border-red-500" />
  );
}
