import React, { useState, useEffect} from "react";
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

  useEffect(() => {
    function zoomOutIfOverflowing() {
      const el = document.querySelector(".maze"); // replace with your own class name
      const docRect = document.documentElement.getBoundingClientRect();

      const elRect = el.getBoundingClientRect();

      if (elRect.width > docRect.width || elRect.height > docRect.height) {
        const scale = Math.min(
          docRect.width / elRect.width,
          docRect.height / elRect.height
        );
        console.log(scale);
        el.style.transform = `scale(${scale})`;
      } 
    }

    if (!maze) return;
    zoomOutIfOverflowing();

    window.addEventListener("resize", zoomOutIfOverflowing);
    return () => {
      window.removeEventListener("resize", zoomOutIfOverflowing);
    };
  }, [maze]);
  if (!maze) return <h1>🥵</h1>;

  return (
    <div className="App">
      <div className="zoom">
        <Maze
          layout={maze}
          w={settings.width}
          h={settings.height}
          sprite={settings.sprite}
        />
      </div>

      <h3 className="tip">
        💡 You can use the A and W keys to scale the sprite - <br /> 💀 If you
        touch the wall you reset.
        <br /> If you can&apos;t see, zoom in or out.
      </h3>
      {settings.hasTime ? (
        <MyCountdown seconds={settings.timeLimit} className="timer" />
      ) : null}
    </div>
  );
};

export default MazeGame;
