import React from "react";
import Linechart from "./Linechart";

const App = () => {
  const data = [
    { x: 1, y: 5 },
    { x: 2, y: 19 },
    { x: 3, y: 2 },
    { x: 4, y: 17 },
    { x: 5, y: 8 },
  ];

  const seconddata = [
    { x: 1, y: 15 },
    { x: 2, y: 0 },
    { x: 3, y: 17 },
    { x: 4, y: 5 },
    { x: 5, y: 18 },
  ];

  return (
    <div style={{ marginTop: 50, marginLeft: 30 }}>
      <h5>Line Graph using D3-js</h5>
      <Linechart data={data} seconddata={seconddata} />
    </div>
  );
};

export default App;
