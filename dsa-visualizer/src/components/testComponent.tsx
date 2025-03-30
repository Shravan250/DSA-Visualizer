import * as d3 from "d3";

export default function TestComponent(containerSelector) {
  // Create the main SVG element
  const svg = d3
    .select(containerSelector)
    .append("svg")
    .attr("id", "maingraph")
    .attr("viewBox", "0 0 1000 600")
    .attr("preserveAspectRatio", "xMidYMin meet");

  // Append marker definitions for arrows
  const marker = svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 9)
    .attr("markerWidth", 3)
    .attr("markerHeight", 3)
    .attr("orient", "auto");
  marker.append("path").attr("d", "M0,-5 L10,0 L0,5").attr("fill", "#333");

  // Create groups for organization
  const polygonGroup = svg.append("g").attr("id", "polygon2");
  const edgeGroup = svg.append("g").attr("id", "edge");
  const vertexGroup = svg.append("g").attr("id", "vertex");
  const vertexTextGroup = svg.append("g").attr("id", "vertexText");
  const edgeWeightGroup = svg.append("g").attr("id", "edgeWeight");

  // --- Draw edges (paths) ---
  // Edge e0
  edgeGroup
    .append("path")
    .attr("id", "e0")
    .attr("class", "de")
    .attr("d", "M216,100L225,100L234,100")
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e1
  edgeGroup
    .append("path")
    .attr("id", "e1")
    .attr("class", "de")
    .attr("d", "M266,100L275,100L284,100")
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e2
  edgeGroup
    .append("path")
    .attr("id", "e2")
    .attr("class", "de")
    .attr("d", "M316,100L325,100L334,100")
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e3
  edgeGroup
    .append("path")
    .attr("id", "e3")
    .attr("class", "de")
    .attr("d", "M366,100L375,100L384,100")
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e4 (diagonal)
  edgeGroup
    .append("path")
    .attr("id", "e4")
    .attr("class", "de")
    .attr(
      "d",
      "M411.31370849898474,111.31370849898477L425,125L438.68629150101526,138.68629150101523"
    )
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e5 (different stroke color)
  edgeGroup
    .append("path")
    .attr("id", "e5")
    .attr("class", "de")
    .attr("d", "M466,100L475,100L484,100")
    .attr("stroke", "#333")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e9
  edgeGroup
    .append("path")
    .attr("id", "e9")
    .attr("class", "de")
    .attr("d", "M166,100L175,100L184,100")
    .attr("stroke", "#ff8a27")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // Edge e10 (vertical line with a different color)
  edgeGroup
    .append("path")
    .attr("id", "e10")
    .attr("class", "de")
    .attr("d", "M450,134L450,125L450,116")
    .attr("stroke", "#52bc69")
    .attr("stroke-width", 3)
    .attr("style", "marker-end: url(#arrow);");

  // --- Draw vertices (circles) ---
  const vertices = [
    {
      id: "v0",
      cx: 200,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#eeeeee",
      text: "-54",
      extra: "",
    },
    {
      id: "v1",
      cx: 250,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#eeeeee",
      text: "-57",
      extra: "",
    },
    {
      id: "v2",
      cx: 300,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#eeeeee",
      text: "27",
      extra: "",
    },
    {
      id: "v3",
      cx: 350,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#eeeeee",
      text: "-50",
      extra: "",
    },
    {
      id: "v4",
      cx: 400,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#ff8a27",
      text: "60",
      extra: "p/5",
    },
    {
      id: "v5",
      cx: 450,
      cy: 100,
      outerFill: "#2ebbd1",
      innerFill: "#2ebbd1",
      text: "65",
      extra: "a/7",
    },
    {
      id: "v6",
      cx: 500,
      cy: 100,
      outerFill: "#333",
      innerFill: "#eee",
      text: "29",
      extra: "tail/8",
    },
    {
      id: "v9",
      cx: 150,
      cy: 100,
      outerFill: "#ff8a27",
      innerFill: "#eeeeee",
      text: "34",
      extra: "head/0",
    },
    {
      id: "v10",
      cx: 450,
      cy: 150,
      outerFill: "#52bc69",
      innerFill: "#52bc69",
      text: "12",
      extra: "vtx/6",
    },
  ];

  vertices.forEach((v) => {
    // Outer circle
    vertexGroup
      .append("circle")
      .attr("class", `${v.id} outer`)
      .attr("cx", v.cx)
      .attr("cy", v.cy)
      .attr("r", 16)
      .attr("fill", v.outerFill)
      .attr("stroke", v.outerFill)
      .attr("stroke-width", 2);

    // Inner circle (creates a ring effect)
    vertexGroup
      .append("circle")
      .attr("class", `${v.id} inner`)
      .attr("cx", v.cx)
      .attr("cy", v.cy)
      .attr("r", 14)
      .attr("fill", v.innerFill)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0);

    // Main vertex text
    vertexTextGroup
      .append("text")
      .attr("class", `${v.id} maintext`)
      .attr("x", v.cx)
      .attr("y", v.cy + 5)
      .attr("fill", v.outerFill)
      .attr("font-family", "'PT Sans', sans-serif")
      .attr("font-size", 16)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text(v.text);

    // Extra vertex text (placed a bit lower)
    if (v.extra) {
      vertexTextGroup
        .append("text")
        .attr("class", `${v.id} extratext`)
        .attr("x", v.cx)
        .attr("y", v.cy + 31)
        .attr("fill", "red")
        .attr("font-family", "'PT Sans', sans-serif")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text(v.extra);
    }
  });

  // --- (Optional) Add edge weight texts using <textPath> ---
  // Here we demonstrate one; you can extend similarly for others.
  const addEdgeWeight = (id, pathId, weight, transform) => {
    const textSelection = edgeWeightGroup
      .append("text")
      .attr("id", id)
      .attr("fill", "#ff8a27")
      .attr("font-family", "'PT Sans', sans-serif")
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle");

    if (transform) {
      textSelection.attr("transform", transform);
    }

    textSelection
      .append("textPath")
      .attr("xlink:href", `#${pathId}`)
      .attr("startOffset", "75%")
      .append("tspan")
      .attr("dy", "-5")
      .text(weight);
  };

  addEdgeWeight("ew0", "e0", "1", "translate(100, 100)");
  addEdgeWeight("ew1", "e1", "1", "translate(100, 100)");
  addEdgeWeight("ew2", "e2", "1", "translate(100, 100)");
  addEdgeWeight("ew3", "e3", "1", "translate(100, 100)");
  addEdgeWeight("ew4", "e4", "1", "translate(36.79,345.44),rotate(-45)");
  addEdgeWeight("ew5", "e5", "1", "translate(100, 100)");
  addEdgeWeight("ew9", "e9", "1", "translate(100, 100)");
  addEdgeWeight("ew10", "e10", "1", "translate(565.5,-324.5),rotate(90)");

  // The component is now set up with your SVG elements and groups.
  console.log("Graph created successfully!");
}
