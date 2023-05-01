import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import "./Menu.css";

const Menu = () => {
  const [settings, setSettings] = React.useState({
    width: 4,
    height: 4,
    sprite: "omori",
    hasTime: false,
    timeLimit: 0,
  });

  console.log(settings);

  const [redActive, setRedActive] = React.useState(false);
  const [blueActive, setBlueActive] = React.useState(false);

  const options = [
    { value: "omori", label: "omori" },
    { value: "aubrey", label: "aubrey" },
  ];

  function handleSelect(option) {
    console.log("Selected option:", option);
    setSettings((prevDimensions) => ({
      ...prevDimensions,
      sprite: option.value,
    }));
  }

  const changeColor = (color) => {
    if (color == "red") {
      document.documentElement.style.setProperty("--theme-color", "#d43a3a");
      setRedActive(true);
      setBlueActive(false);
    } else {
      document.documentElement.style.setProperty("--theme-color", "#3a5bd4");
      setBlueActive(true);
      setRedActive(false);
    }
  };

  const [checked, setChecked] = React.useState(false);

  const handleCheck = (e) => {
    setChecked(!checked);
    setSettings((prevDimensions) => ({
      ...prevDimensions,
      hasTime: e.target.checked,
    }));
  };

  const handleTimeLimit = (e) => {
    setSettings((prevDimensions) => ({
      ...prevDimensions,
      timeLimit: parseInt(e.target.value),
    }));
  };

  return (
    <div className="menu">
      <ul>
        <h1>The Maze</h1>
        <li>
          <button
            onClick={() => changeColor("red")}
            className={redActive ? "button-active" : ""}
          >
            Crimson Red
          </button>

          <button
            onClick={() => changeColor("blue")}
            className={blueActive ? "button-active" : ""}
          >
            Moody Blue
          </button>
        </li>
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

              setSettings((prevDimensions) => ({
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

              setSettings((prevDimensions) => ({
                ...prevDimensions,
                height: e.target.value,
              }));
            }}
          />
        </li>

        <li>
          <Dropdown
            options={options}
            onChange={handleSelect}
            placeholder="Select a sprite"
            controlClassName="dropdown-control"
            menuClassName="myMenuClassName"
          />
        </li>

        <li>
          <div className="time">
            <label>
              <input type="checkbox" checked={checked} onChange={handleCheck} />
            </label>
            <label>
              <input
                type="number"
                placeholder="Time (in seconds)"
                disabled={checked ? false : true}
                min="0"
                value={settings.timeLimit}
                onChange={(e) => {
                  handleTimeLimit(e);
                }}
              />
            </label>
          </div>
        </li>

        <li>
          <Link to="/maze" state={settings}>
            Play
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
