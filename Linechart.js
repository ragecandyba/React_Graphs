import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import tip from "d3-tip";

const LineChart = ({ data, seconddata }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 10 };
    const width = window.innerWidth / 2 - margin.left - margin.right;
    const height = window.innerHeight / 2 - margin.bottom;

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([1, 5]) // Adjust according to your data
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 20]) // Adjust according to your data
      .range([height, 0]);

    // Create the line function
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    // Select the SVG element using the ref
    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    const tooltip = tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d) => `Value: ${d.y}`);

    // Call the tip function on the SVG element
    svg.call(tooltip);

    const tooltip1 = tip()
      .attr("class", "d3-tip1")
      .offset([-10, 0])
      .html((d) => `Value: ${d.y}`);

    // Call the tip function on the SVG element
    svg.call(tooltip1);

    // Append the line path
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 5)
      .attr("d", line)
      .on("mouseover", tooltip.show) // Show tooltip on mouseover
      .on("mouseout", tooltip.hide); // Hide tooltip on mouseout

    svg
      .append("path")
      .datum(seconddata)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 5)
      .attr("d", line)
      .on("mouseover", tooltip1.show) // Show tooltip on mouseover
      .on("mouseout", tooltip1.hide); // Hide tooltip on mouseout

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis

    // svg.append("g").call(d3.axisLeft(yScale).ticks(5));
    svg.append("g").call(d3.axisRight(yScale));

    svg
      .append("text")
      .attr("transform", `translate(${width / 2},${height + margin.top * 2})`)
      .style("text-anchor", "middle")
      .text("Vehicles");

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${width + margin.left},${height - margin.bottom})`
      );

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "red");

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 34)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text("India");

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "blue")
      .attr("transform", "translate(0, 25)");

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text("USA");
  }, [data, seconddata]);

  return <svg ref={svgRef} width="100%" height="400px"></svg>;
};

export default LineChart;
