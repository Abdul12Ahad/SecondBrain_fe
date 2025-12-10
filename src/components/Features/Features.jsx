import React from "react";
import "./Features.css";

export const Features = ({title,description,icon}) => {
    return (
        <div className="feat" id="features">
            <h3 className="feat-title">{title}</h3>
            <p className="feat-description">{description}</p>
            <p className="feat-icons">{icon}</p>
        </div>
    );
}