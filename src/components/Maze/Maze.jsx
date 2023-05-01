import React, { useEffect, useState, useRef } from "react";
import Player from "../Player/Player";
import PropTypes from "prop-types";
import "../Wall/Wall.css";
import "./Maze.css";

const Maze = ({ layout, w, h, sprite }) => {
  // eslint-disable-next-line no-unused-vars
  const [isColliding, setIsColliding] = useState(false);
  const initialPosition = { x: 10, y: 10 };
  const playerRef = useRef();
  const [playerInfo, setPlayerInfo] = useState({
    sprite: sprite,
    color: "orange",
    position: initialPosition,
    width: 100,
    height: 100,
    direction: { x: 0, y: 0 },
    colliding: false,
  });

  const collision = (rectA, rectB) => {
    return (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    );
  };

  useEffect(() => {
    const checkCollisions = () => {
      const playerRect = playerRef.current.getBoundingClientRect();
      const walls = document.querySelectorAll(".wall");

      for (let i = 0; i < walls.length; i++) {
        const wallRect = walls[i].getBoundingClientRect();
        if (collision(playerRect, wallRect)) {
          setIsColliding(true);
          playerInfo.colliding = true;
          return;
        }
      }
      playerInfo.colliding = false;
      setIsColliding(false);
    };
    const checkGoal = () => {
      const playerRect = playerRef.current.getBoundingClientRect();
      const goal = document.querySelector(".goal");
      const goalRect = goal.getBoundingClientRect();
      if (collision(playerRect, goalRect)) {
        alert("You win!");
        playerInfo.position = { x: 10, y: 10 };
      }
    };

    checkGoal();
    checkCollisions();
  }, [playerInfo.position]);

  const width = (w * 3 + 1) * 60;
  const height = "auto";

  return (
    <>
      <div
        style={{
          gridTemplateColumns: `repeat(${w * 3 + 1},${width / (w * 3 + 1)}px)`,
          gridTemplateRows: `repeat(${h * 2 + 1},${height / (h * 3 + 1)}px)`,
          width: `${width} !important`,
        }}
        className="maze"
      >
        {layout.flat().map((cell, cellIndex) => {
          switch (cell) {
            case "p":
              return (
                <Player
                  key={cellIndex}
                  ref={playerRef}
                  dimensions={w}
                  setPlayerInfo={setPlayerInfo}
                  playerInfo={playerInfo}
                  size={{
                    width: `${width / (w * 3 + 1)}px `,
                    height: height / (1.5 * (h * 3 + 1)),
                  }}
                />
              );
            case " ":
              return (
                <div
                  key={cellIndex}
                  style={{
                    backgroundColor: "#DFDBE5",

                    backgroundSize: "cover",
                  }}
                ></div>
              );
            case "+":
              return (
                <div
                  key={cellIndex}
                  className="wall"
                  style={{
                    backgroundColor: "black",
                    width: `${width / (w * 3 + 1)}px `,
                    height: `${height / (h * 3 + 1)}px`,

                    backgroundSize: "cover",
                  }}
                >
                  <div className="inside-wall"> </div>
                </div>
              );

            case "g":
              return (
                <div
                  className="goal"
                  style={{
                    backgroundImage:
                      "url(https://e.snmc.io/i/600/s/5771120cdae0b12e85599a8a6b33806b/10194577)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                    backgroundSize: "90%",
                    backgroundColor: "#dfdbe5",
                    width: `${width / (w * 3 + 1)}px `,
                    height: `${height / (h * 3 + 1)}px`,
                  }}
                ></div>
              );
            default:
              return (
                <div
                  key={cellIndex}
                  className="wall"
                  style={{
                    backgroundColor: "black",
                    width: `${width / (w * 3 + 1)}px `,
                    height: `${height / (h * 3 + 1)}px`,

                    backgroundSize: "cover",
                  }}
                ></div>
              );
          }
        })}
      </div>
    </>
  );
};

Maze.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.arrayOf(String)).isRequired,
  w: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
  sprite: PropTypes.string.isRequired,
};

export default Maze;
