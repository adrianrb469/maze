import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import Maze from "/src/components/Maze/Maze.jsx";

import "/src/App.css";

const MazeGame = () => {
    const [maze, setMaze] = useState(null);
    const dimensions = useLocation().state;


    const getMaze = async (w, h) => {
        const response = await fetch(
            `http://maze.uvgenios.online/?type=json&w=${w}&h=${h}`
        );
        return await response.json();
    };

    const loadMaze = async () => {
        const val = await getMaze(dimensions.width, dimensions.height);
        setMaze(val);
    };

    useEffect(() => {
        loadMaze();
    }, []);

    if (!maze) return <h1 >🥵</h1>;

    return (
        
        <div className="App">
            
            <Maze layout={maze} w={dimensions.width} h={dimensions.height} />
            
           
        </div>
    );
}

export default MazeGame;
