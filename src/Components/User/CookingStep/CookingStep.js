import React from "react";
import "./CookingStep.scss"
const CookingStep = ({ id, name }) => {
  return (
    <div className="cooking__step__container">
        <div className="cooking__step__id"><span>{id}</span></div>
        <div className="cooking__step__instructions">{name}</div>
    </div>
  );
};

export default CookingStep;
