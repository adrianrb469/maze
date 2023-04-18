import React, { useEffect, useState, useRef } from "react";
import Player from "../Player/Player";
import Wall from "../Wall/Wall";
import "./Maze.css";

export default function Maze({ layout, w, h }) {
    const [isColliding, setIsColliding] = useState(false);
    const initialPosition = { x: 10, y: 10 };
    const playerRef = useRef();
    const [playerInfo, setPlayerInfo] = useState({
        color: "orange",
        position: initialPosition,
        width: 100,
        height: 100,
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

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${w * 3 + 1},65px)`,
                    gridTemplateRows: `repeat(${h * 2 + 1},65px)`,
                    width: `${(w * 3 + 1) * 65}px`,
                }}
                className="maze"
            >
                {layout.flat().map((cell, cellIndex) => {
                    switch (cell) {
                        case "p":
                            return (
                                <div
                                    key={cellIndex}
                                    style={{
                                        backgroundColor: "red",
                                        width: "65px",

                                        height: "65px",
                                    }}
                                >
                                    {" "}
                                    <Player
                                        key={cellIndex}
                                        ref={playerRef}
                                        setPlayerInfo={setPlayerInfo}
                                        playerInfo={playerInfo}
                                    />
                                </div>
                            );
                        case " ":
                            return (
                                <div
                                    key={cellIndex}
                                    style={{
                                        width: "65px",
                                        backgroundColor: "#DFDBE5",

                                        height: "65px",
                                        backgroundSize: "cover",
                                    }}
                                ></div>
                            );
                        case "g":
                            return (
                                <div
                                    className="goal"
                                    style={{
                                        backgroundImage:
                                            "url(https://art.pixilart.com/9895c77c010d6b1.gif)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        width: "65px",

                                        height: "65px",
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
                                        width: "65px",
                                        height: "65px",

                                        backgroundSize: "cover",
                                    }}
                                ></div>
                            );
                    }
                })}
            </div>
        </>
    );
}
