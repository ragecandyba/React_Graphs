import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import Speedtwo from "./Speedtwo";

const chartStyle = {
  width: 600,
};

const LiveGaugeChart = () => {
  const [value, setValue] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random();
      setValue(newValue);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <div className="title">Live Updating GaugeChart</div>
        <GaugeChart
          style={chartStyle}
          arcsLength={[1]}
          colors={["blue"]}
          percent={value}
          arcPadding={0.02}
          textColor="black"
          needleBaseColor="red"
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <Speedtwo />
      </div>
    </>
  );
};

export default LiveGaugeChart;
