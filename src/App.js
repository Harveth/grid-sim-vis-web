import React, { useState, useEffect } from 'react';
import Graph from 'react-vis-network-graph';

const init_color = { color: 'black' }
const init_node_color = { color: '#36bbd6' }

const GraphComponent = () => {
  const [graph, setGraph] = useState({
    nodes: Array.from({ length: 7 }, (_, i) => ({ id: i + 1, label: `Node ${i + 1}`, color: init_node_color })),
    edges: [
      { from: 1, to: 2, color: init_color },
      { from: 1, to: 3, color: init_color },
      { from: 1, to: 4, color: init_color },
      { from: 1, to: 5, color: init_color },
      { from: 1, to: 6, color: init_color },
      { from: 1, to: 7, color: init_color },

      { from: 2, to: 3, color: init_color },
      { from: 2, to: 4, color: init_color },
      { from: 2, to: 5, color: init_color },
      { from: 2, to: 6, color: init_color },
      { from: 2, to: 7, color: init_color },

      { from: 3, to: 4, color: init_color },
      { from: 3, to: 5, color: init_color },
      { from: 3, to: 6, color: init_color },
      { from: 3, to: 7, color: init_color },

      { from: 4, to: 5, color: init_color },
      { from: 4, to: 6, color: init_color },
      { from: 4, to: 7, color: init_color },

      { from: 5, to: 6, color: init_color },
      { from: 5, to: 7, color: init_color },

      { from: 6, to: 7, color: init_color },


    ],
  });

  const options = {
    edges: {
      color: '#000000', // Initial edge color
    },
  };

  const events = {
    select: ({ edges }) => {
      // Handle edge selection and change color
      if (edges && edges.length === 1) {
        const selectedEdge = edges[0];
        const updatedEdges = graph.edges.map((edge) => {
          if (edge.from === selectedEdge.from && edge.to === selectedEdge.to) {
            // Change the color when the selected edge is found
            return { ...edge, color: 'red' }; // Change to your desired color
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
    const interval = setInterval(() => {
      const randomEdgeIndexes = Array.from({ length: 5 }, () => Math.floor(Math.random() * graph.edges.length));
      const updatedEdges = graph.edges.map((edge, index) => {
        if (randomEdgeIndexes.includes(index)) {
          // get start and end node of the edge
          const startNode = edge.from;
          const endNode = edge.to;

          //change the color of the nodes ????


          return { ...edge, color: 'red' }; // Change to your desired color
        }
        return edge;
      });

      const updatedNodes = graph.nodes.map((node) => ({
        ...node,
        label: String(Math.floor(Math.random() * 100)),
      }));




      setGraph((prevGraph) => ({
        ...prevGraph,
        edges: updatedEdges,
        nodes: updatedNodes,
      }));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'Arial', fontSize: '38px', textTransform: 'uppercase' }}>P2P System Visualizer</h1>
      </div>
      <Graph graph={graph} options={options} events={events} style={{ height: '90vh' }} />
    </div>
  );
};

export default GraphComponent;
