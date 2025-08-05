import React from "react";
import { Link } from "react-router-dom"; 
import "./style/buttonComponents.css"; 

function Button({ text, href, target = "_self" }) {
  return (
    <a href={href} target={target} className="customButton">
      {text}
    </a>
  );
}

export default Button;