import React, { useState, useEffect } from "react";
import Graph from "react-vis-network-graph";

const init_color = { color: "black" };
const init_node_color = { color: "#36bbd6" };


async function updateState() {
  let data = null;
  try {
    const response = await fetch("http://localhost:5000/next", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    });
    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if (data === null) {
    return { nodes: [], edges: [] };
  }
  return {
    nodes: data.meters.map((meter) => {
      return {
        id: meter.id,
        label: `Node ${meter.id}`,
        color: init_node_color,
      };
    }),
    edges: data.meters
      .filter((meter) => meter.in_trade)
      .map((meter) => {
        return {
          from: meter.id,
          to: meter.in_trade,
          color: "red",
        };
      }),
  };
}

const GraphComponent = () => {
  const [graph, setGraph] = useState({});

  const options = {
    edges: {
      color: "#000000", // Initial edge color
    },
  };

  const events = {
    select: ({ edges }) => {
      // Handle edge selection and change color
      if (edges && edges.length === 1) {
        const selectedEdge = edges[0];
        const updatedEdges = graph.edges.map((edge) => {
          if (
            edge.from === selectedEdge.from &&
            edge.to === selectedEdge.to
          ) {
            // Change the color when the selected edge is found
            return { ...edge, color: "red" }; // Change to your desired color
          }
          return edge;
        });

        setGraph((prevGraph) => ({
          ...prevGraph,
          edges: updatedEdges,
        }));
      }
    },
  };

  useEffect(() => {
    const fetchDataAndUpdateGraph = async () => {
      try {
        const updatedGraph = await updateState();
        setGraph(updatedGraph);
      } catch (error) {
        console.error("Error fetching and updating graph:", error);
      }
    };
  
    const interval = setInterval(fetchDataAndUpdateGraph, 1000);
  
    // Clean up function
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
      </div>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "90vh" }}
      />
    </div>
  );
};

export default GraphComponent;
