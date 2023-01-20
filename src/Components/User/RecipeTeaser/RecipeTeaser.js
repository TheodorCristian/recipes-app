import React from "react";
import "./RecipeTeaser.scss";
import { Link } from "react-router-dom";
import TimeStat from "../../../Assets/images/hourglass.png";
import DifficultyStat from "../../../Assets/images/speedometer.png";
import CaloriesStat from "../../../Assets/images/calories.png";

const RecipeTeaser = ({
  name,
  image,
  description,
  category,
  url,
  time,
  difficulty,
  calories,
}) => {
  return (
    <div className="recipe__teaser">
      <div className="recipe__teaser__image">
        <Link to={`/recipes/${category}/${url}`}>
          <img src={image} alt="Recipe" />
        </Link>
      </div>
      <div className="recipe__description">
        <h5 className="recipe__category">{category}</h5>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="recipe__stats">
        <div className="recipe__stat">
          <span>
            <img src={TimeStat} alt="Hourglass" />
          </span>
          <p>{time}</p>
        </div>
        <div className="recipe__stat">
          <span>
            <img src={DifficultyStat} alt="Difficulty" />
          </span>
          <p>{difficulty}</p>
        </div>
        <div className="recipe__stat">
          <span>
            <img src={CaloriesStat} alt="Hourglass" />
          </span>
          <p>{calories}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeTeaser;
