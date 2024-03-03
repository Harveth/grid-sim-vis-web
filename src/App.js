import React, { useState, useEffect } from "react";
import Graph from "react-vis-network-graph";

const init_color = { color: "black" };
const init_node_color = { color: "#36bbd6" };

const GraphComponent = () => {
  const [meters, setMeters] = useState([]);
  const [time, setTime] = useState("");
  const [fetchInterval, setFetchInterval] = useState(5000); // Default fetch interval in milliseconds
  const [remaining, setRemaining] = useState(0); // State for remaining attribute
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
        if (data === null) return;
        setTime(data.time);
        setMeters(data.meters);
        setRemaining(data.remaining); // Update remaining state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, fetchInterval);
    return () => {
      clearInterval(interval);
    };
  }, [fetchInterval]); // Include fetchInterval in dependency array to trigger effect when it changes

  const handleIntervalChange = (event) => {
    setFetchInterval(parseInt(event.target.value));
  };

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
        <div style={{padding: "10px"}}>
          <label htmlFor="fetchInterval">Fetch Interval (milliseconds):</label>
          <input
            type="range"
            id="fetchInterval"
            name="fetchInterval"
            min="100"
            max="3000"
            step="100"
            value={fetchInterval}
            onChange={handleIntervalChange}
          />
          <span>{fetchInterval} milliseconds</span>
        </div>
        <div style={{ marginBottom: "10px" }}>Remaining frames in buffer: {remaining}</div> {/* Display remaining attribute */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "10px", justifyContent: "center" }}>
          {meters.map((meter, index) => (
            <div key={index} style={{ minWidth: "200px", borderWidth: "1px", borderStyle: "solid", borderColor: ["red", "green"][(meter.surplus >= 0) * 1], padding: "8px", borderRadius: "20px"}}>
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
