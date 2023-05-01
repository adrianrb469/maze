import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import "./MyCountdown.css";

function MyCountdown({ seconds }) {
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + seconds * 1000)
  );

  useEffect(() => {
    setTargetDate(new Date(Date.now() + seconds * 1000));
  }, [seconds]);

  const renderer = ({ seconds }) => {
    return (
      <div className="timer">
        {seconds > 0 ? <span>{seconds} seconds</span> : <span>Game over!</span>}
      </div>
    );
  };

  return <Countdown date={targetDate} renderer={renderer} />;
}

export default MyCountdown;
