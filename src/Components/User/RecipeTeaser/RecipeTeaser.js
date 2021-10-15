import React from "react";
import "./RecipeTeaser.scss";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { db } from "../../../firebaseAuthConfig";

const RecipeTeaser = ({ name, image, description, category, url }) => {
  const handleClick = () => {
    db.collection("wishlist").add({ wishlist_recipe_name: name });
  };
  return (
    <div className="recipe__teaser">
      <div className="recipe__teaser__image">
        <Link to={`/recipes/${category}/${url}`}>
          <img src={image} alt="Recipe" />
        </Link>
      </div>
      <div className="recipe__teaser__title">
        <h3>{name}</h3>
      </div>
      <div className="recipe__teaser__subtitle">
        <p>{description}</p>
      </div>
      {/* <div className="recipe__teaser__addToWishList">
        <p onClick={handleClick}>
          <span>{<AddCircleIcon />}</span>Add to Wishlist
        </p>
      </div> */}
    </div>
  );
};

export default RecipeTeaser;
