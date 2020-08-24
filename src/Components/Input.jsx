import React from "react";
import classes from './Input.module.css'

const Input = (props) => {
  let inputElement;
  switch (props.inputType) {
    case "input":
      inputElement = <input className={classes.inputElement} {...props} />;
      break;
    case "textarea":
      inputElement = <textarea className={classes.inputElement} {...props} />;
      break;
    default:
      inputElement = <input className={classes.inputElement} {...props} />;
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
