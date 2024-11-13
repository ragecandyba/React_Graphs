import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./App.css";
import Speed from "./Speed";
import LineGraph from "./LineGraph";
import D3line from "./D3line";

function App() {
  const [data] = useState([
    { month: "Jan", male: 200, female: 180 },
    { month: "Feb", male: 250, female: 230 },
    { month: "March", male: 60, female: 100 },
    { month: "April", male: 150, female: 120 },
    { month: "May", male: 100, female: 140 },
    { month: "June", male: 175, female: 200 },
    { month: "July", male: 40, female: 30 },
    { month: "August", male: 50, female: 70 },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 500;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-left", "80px")
      .style("margin-top", "80px");

    const groupKeys = ["male", "female"];
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, w]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(groupKeys, (key) => d[key]))])
      .range([h, 0]);

    const color = d3.scaleOrdinal().domain(groupKeys).range(["blue", "pink"]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
    svg.append("g").call(yAxis);

    const cornerRadius = 12;
    const roundPath = (x, y, width, height) => {
      return `
      M ${x - 3},${y + height}
      V ${y + cornerRadius}
      A ${cornerRadius},${cornerRadius} 0 0 1 ${x + cornerRadius},${y}
      H ${x + width - cornerRadius}
      A ${cornerRadius},${cornerRadius} 0 0 1 ${x + width},${y + cornerRadius}
      V ${y + height}
      H ${x}
      
      `;
    };

    const barGroups = svg
      .selectAll(".barGroup")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "barGroup")
      .attr("transform", (d) => `translate(${xScale(d.month)}, 0)`);

    barGroups
      .selectAll(".bar")
      .data((d) => groupKeys.map((key) => ({ key, value: d[key] })))
      .enter()
      .append("path")
      .attr("class", "bar")
      .attr("d", (d) =>
        roundPath(
          xScale.bandwidth() * 0.25 +
            xScale.bandwidth() * (groupKeys.indexOf(d.key) * 0.5),
          yScale(d.value),
          xScale.bandwidth() * 0.25,
          h - yScale(d.value)
        )
      )
      .attr("fill", (d) => color(d.key));
  }, [data]);

  return (
    <>
      <div>
        <div className="title">Male to Female Ratio</div>
        <svg ref={svgRef}></svg>
      </div>
      <div style={{ marginTop: 50 }}>
        <Speed />
        <LineGraph />
        <D3line />
      </div>
    </>
  );
}

export default App;
