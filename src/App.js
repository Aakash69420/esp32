import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ServoSlider from "./components/ServoSlider";
import GraphPage from "./components/GraphPage"; // Import the GraphPage component
import "./components/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servo-slider" element={<ServoSlider />} />
          <Route path="/history" element={<GraphPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
