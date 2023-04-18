import React, { useState, useEffect } from "react";
import Maze from "./components/Maze/Maze";
import "./App.css";

function App() {
    const [maze, setMaze] = useState(null);

    const getMaze = async (w, h) => {
        const response = await fetch(
            `http://maze.uvgenios.online/?type=json&w=${w}&h=${h}`
        );
        return await response.json();
    };

    const loadMaze = async () => {
        const val = await getMaze(4, 4);
        setMaze(val);
    };

    useEffect(() => {
        loadMaze();
    }, []);

    if (!maze) return <div>Loading...</div>;

    return (
        <div className="App">
            <Maze layout={maze} w={4} h={4} />
        </div>
    );
}

export default App;
