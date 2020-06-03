import React from "react";
import classes from "./Button.module.css";

const Button = (props) => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    id={props.id}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
