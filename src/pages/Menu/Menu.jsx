import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const [dimensions, setDimensions] = React.useState({
    width: 4,
    height: 4,
  });
  console.log(dimensions);
  return (
    <div className="menu">
      <h1>The Maze</h1>
      <ul>
        <li>
          <input
            type="number"
            id="width"
            name="width"
            placeholder="width"
            min="4"
            max="100"
            onChange={(e) => {
              if (e.target.value < 4 || e.target.value > 100) {
                e.target.value = 4;
              }

              setDimensions((prevDimensions) => ({
                ...prevDimensions,
                width: e.target.value,
              }));
            }}
          />
        </li>
        <li>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="height"
            min="4"
            max="100"
            onChange={(e) => {
              if (e.target.value < 4 || e.target.value > 100) {
                e.target.value = 4;
              }

              setDimensions((prevDimensions) => ({
                ...prevDimensions,
                height: e.target.value,
              }));
            }}
          />
        </li>

        <li>
          <Link to="/maze" state={dimensions}>
            Play
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
