import React from "react";
import Button from "./ButtonComponent"
import "./style/Card.css";

function Card({ icon, title, description, buttonText, href ,className }) {
    return (
        <div className="Card">
        <div className="CardIcon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button text={buttonText} href={href}
        
        /> 
        </div>
    );
    }
export default Card;