/* eslint-disable react/display-name */
import React, { useEffect, useState, forwardRef } from "react";
import "./Player.css";

const Player = forwardRef(({ setPlayerInfo, playerInfo }, ref) => {
    function decay(dx, dy) {
        const glideDuration = 300; // in milliseconds
        const initialSpeed = 0.05; // initial speed of gliding
        const acceleration = 0.002; // acceleration of gliding

        let start = Date.now();
        let speed = initialSpeed;

        let timer = requestAnimationFrame(function animateBall(timestamp) {
            let interval = Date.now() - start;

            // Make it work for negative dx and dy

            // Decrease dx based on current speed
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

            // Increase speed based on elapsed time and acceleration
            speed = Math.min(
                1,
                initialSpeed + (acceleration * interval) / glideDuration
            );

            // Continue animation until dx reaches 0
            if (dx != 0 || dy != 0) {
                requestAnimationFrame(animateBall);
            }
        });
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                decay(0, -2);

                break;
            case "ArrowDown":
                decay(0, 2);
                break;
            case "ArrowLeft":
                decay(-2, 0);

                break;
            case "ArrowRight":
                decay(2, 0);

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
            }}
        ></div>
    );
});
export default Player;
