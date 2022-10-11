import React from "react";
import { Link } from "react-router-dom";
import "./RecipeRow.scss";

const RecipeRow = ({ id, name, description }) => {
  return (
    <div className="recipe-row">
      <p>{name}</p>
      <Link to={`/edit-recipe/${id}`}>
        Go to edit <span>{name}</span>
      </Link>
    </div>
  );
};

export default RecipeRow;
