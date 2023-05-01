import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./MyCountdown.css";

function MyCountdown({ seconds }) {
  const [remainingTime, setRemainingTime] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer">
      {remainingTime > 0 ? (
        <div>{formatTime(remainingTime)}</div>
      ) : (
        <div>Game Over</div>
      )}
    </div>
  );
}

MyCountdown.propTypes = {
  seconds: PropTypes.number.isRequired,
};
export default MyCountdown;
