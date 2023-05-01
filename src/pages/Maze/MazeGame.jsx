import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Maze from "/src/components/Maze/Maze.jsx";
import MyCountdown from "../../components/Countdown/MyCountdown";
import "/src/App.css";

const MazeGame = () => {
  const [maze, setMaze] = useState(null);
  const settings = useLocation().state;

  const getMaze = async (w, h) => {
    const response = await fetch(
      `http://maze.uvgenios.online/?type=json&w=${w}&h=${h}`
    );
    return await response.json();
  };

  const loadMaze = async () => {
    const val = await getMaze(settings.width, settings.height);
    setMaze(val);
  };

  useEffect(() => {
    loadMaze();
  }, []);

  if (!maze) return <h1>🥵</h1>;

  return (
    <div className="App">
      <Maze
        layout={maze}
        w={settings.width}
        h={settings.height}
        sprite={settings.sprite}
      />
      <h3 className="tip">
        💡 You can use the A and W keys to scale the sprite - <br /> 💀 If you
        touch the wall you reset.{" "}
      </h3>
      {settings.hasTime ? (
        <MyCountdown seconds={settings.timeLimit} className="timer" />
      ) : null}
    </div>
  );
};

export default MazeGame;
