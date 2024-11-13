import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { mokdata as data } from "./data";

const Line = () => (
  <>
    <h5>Line Graph using Nivo.rocks</h5>
    <div className="linegraph">
      <ResponsiveLine
        useMesh={true}
        enableGridX={false}
        enableGridY={false}
        enablePointLabel={true}
        pointLabelYOffset={-10}
        data={data}
        pointColor="black "
        colors={["blue", "red"]}
        margin={{
          top: 25,
          right: 110,
          bottom: 50,
          left: 60,
        }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
        }}
        minY="auto"
        maxY="auto"
        curve="linear"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0 /* The tick of the x-axis rotation */,
          legend: "Vehicles",
          legendOffset: 36 /*Margin from the graph */,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0 /* The tick of the y-axis rotation */,
          legend: "Count of Vehicles",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            itemDirection: "left-to-right",
            itemBackground: "white",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 10,
            symbolShape: "square",

            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "yellow",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  </>
);

export default Line;
