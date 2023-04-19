import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import Maze from "./components/Maze/Maze";
import MazeGame from "./pages/Maze/MazeGame.jsx";
import Menu from "./pages/Menu/Menu";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/maze" element={<MazeGame />} />
      </Routes>
    </div>
  );
};

export default App;
