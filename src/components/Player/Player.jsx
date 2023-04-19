/* eslint-disable react/display-name */
import React, { useEffect, useState, forwardRef, useRef } from "react";
import "./Player.css";

const Player = forwardRef(({ setPlayerInfo, playerInfo, dimensions }, ref) => {
  const img = useRef(null);

  function decay(dx, dy) {
    const glideDuration = 300; // in milliseconds
    const initialSpeed = 0.05; // initial speed of gliding
    const acceleration = 0.002; // acceleration of gliding

    let start = Date.now();
    let speed = initialSpeed;

    requestAnimationFrame(function animateWalk(timestamp) {
      let interval = Date.now() - start;

      if (dx < 0) {
        dx = Math.min(0, dx + speed);
      } else {
        dx = Math.max(0, dx - speed);
      }
      if (dy < 0) {
        dy = Math.min(0, dy + speed);
      } else {
        dy = Math.max(0, dy - speed);
      }

      setPlayerInfo((prevInfo) => ({
        ...prevInfo,
        position: {
          x: prevInfo.position.x + dx,
          y: prevInfo.position.y + dy,
        },
      }));

      speed = Math.min(
        1,
        initialSpeed + (acceleration * interval) / glideDuration
      );

      if (dx != 0 || dy != 0) {
        img.current.classList.add("player-spritesheet");
        requestAnimationFrame(animateWalk);
      } else {
        img.current.classList.remove("player-spritesheet");
      }
    });
  }

  const [pixelsize, setPixelsize] = useState(
    dimensions < 4 ? 6 - dimensions : -0.25 * dimensions + 2.8
  );

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        decay(0, -1);
        img.current.classList.remove(
          "player-front",
          "player-right",
          "player-left"
        );
        img.current.classList.add("player-up");
        break;
      case "ArrowDown":
        decay(0, 1);

        img.current.classList.remove(
          "player-front",
          "player-right",
          "player-left",
          "player-up"
        );
        img.current.classList.add("player-back");
        break;
      case "ArrowLeft":
        decay(-1, 0);
        img.current.classList.remove(
          "player-front",
          "player-right",
          "player-down",
          "player-up"
        );
        img.current.classList.add("player-left");

        break;
      case "ArrowRight":
        decay(1, 0);
        img.current.classList.remove(
          "player-front",
          "player-left",
          "player-down",
          "player-up"
        );
        img.current.classList.add("player-right");
        break;

      case "d":
        setPixelsize(pixelsize + 0.1);
        break;

      case "a":
        setPixelsize(pixelsize - 0.1);
        break;
      default:
        break;
    }
  }

  if (playerInfo.colliding) {
    playerInfo.position = { x: 10, y: 10 };
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      ref={ref}
      className="player"
      style={{
        transform: `translate(${playerInfo.position.x}px, ${playerInfo.position.y}px)`,
        "--pixel-size": `${pixelsize}`,
      }}
    >
      <img
        className="player-base player-front"
        src="src/assets/omori.png"
        alt="DemoRpgCharacter"
        ref={img}
        style={{ "--pixel-size": `${pixelsize}` }}
      />
    </div>
  );
});
export default Player;
