import React from "react";
import "./Back.scss";
import BackIcon from "../../../Assets/images/back.png";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="back__container" onClick={goBack}>
      <img src={BackIcon} alt="Back" />
    </div>
  );
};

export default Back;
