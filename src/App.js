import React, { useState, useEffect } from "react";
import Graph from "react-vis-network-graph";

const init_color = { color: "black" };
const init_node_color = { color: "#36bbd6" };

const GraphComponent = () => {
  const [meters, setMeters] = useState([]);
  const [time, setTime] = useState("");
  const options = {
    edges: {
      color: "#000000", // Initial edge color
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/next");
        if (!response.ok) return;
        const data = await response.json();
        setTime(data.time)
        setMeters(data.meters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Arial",
            fontSize: "38px",
            textTransform: "uppercase",
          }}
        >
          P2P System Visualizer
        </h1>
        <h2>{time}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "10px", justifyContent: "center" }}>
          {meters.map((meter, index) => (
            <div key={index} style={{ minWidth: "200px", borderWidth: "1px", borderStyle: "solid", borderColor: ["red", "green"][(meter.surplus >= 0) * 1], padding: "8px"}}>
              <h3>Meter {meter.id}</h3>
              <p>Surplus: {parseFloat(meter.surplus.toFixed(5))}</p>
              <p style={{ minWidth: "100px" }}>In Trade: {meter.in_trade}</p>
            </div>
          ))}
        </div>
        {/* <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "90vh" }}
      /> */}
      </div>
    </div>
  );
};

export default GraphComponent;
