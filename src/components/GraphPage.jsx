import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import $ from "jquery";
import "./Graph.css"

function GraphPage() {
  const [angleData, setAngleData] = useState([]);

  useEffect(() => {
    // Fetch the angle data from the API and update the state
    $.get("https://6405792240597b65de37fdaa.mockapi.io/angle", function (data) {
      setAngleData(data);
    });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const chartData = {
    labels: angleData.map((item) => formatTimestamp(item.timestamp)),
    datasets: [
      {
        label: "Angle",
        data: angleData.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Timestamp",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Angle",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          min: 0,
          max: 180,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container">
     <h1 className="card-title">Angle History</h1>
      <div className="graph-card">
        <div className="card-body">
          <div className="chart-container" style={{ height: "100%", width : "100%" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphPage;
