import React, { forwardRef } from "react";
import PropTypes from "prop-types";
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

Wall.propTypes = {
  letter: PropTypes.oneOf(["X", "G"]).isRequired,
};

Wall.displayName = "Wall";

export default Wall;
