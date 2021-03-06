import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        id={`less-${props.label}`}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={classes.More}
        id={`more-${props.label}`}
        onClick={props.added}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;
