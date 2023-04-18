/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import "./Wall.css";

const Wall = forwardRef(({ letter }, ref) => {
    if (letter === "X") {
        return <div className="ground wall"></div>;
    }
    if (letter === "G") {
        return <div className="goal wall">🐠</div>;
    }
    return (
        <div className="wall normal" ref={ref}>
            a
        </div>
    );
});

export default Wall;
