import React, { useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import "./App.css";

function ServoSlider() {
  const [servoPos, setServoPos] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false); // State variable to track success status

  const handleSliderChange = (event) => {
    const pos = event.target.value;
    setServoPos(pos);
    setIsSuccess(false); // Reset the success status when slider changes
  };

  const handlePostAngle = () => {
    const angleData = {
      value: servoPos,
      timestamp: new Date().toISOString()
    };

    $.ajax({
      url: "https://6405792240597b65de37fdaa.mockapi.io/angle",
      type: "POST",
      data: angleData,
      success: function (response) {
        console.log("Angle posted successfully:", response);
        setIsSuccess(true); // Set the success status to true
      },
      error: function (error) {
        console.error("Failed to post angle:", error);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Actuator motion angle</h1>
          <p className="card-text">
            Position: <span className="servo-value">{servoPos}</span>
          </p>
          <div className="servo-slider">
            <input
              type="range"
              min="0"
              max="180"
              className="slider"
              onChange={handleSliderChange}
            />
          </div>
          {isSuccess && <p className="success-message">Angle posted successfully!</p>}
          <button onClick={handlePostAngle}>Okay</button>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/history">
            <button>View History</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServoSlider;
