import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import "./WishlistRecipeTeaser.scss";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseAuthConfig";
import Trash from "../../../Assets/images/trash.png";
import TimeStat from "../../../Assets/images/hourglass.png";
import DifficultyStat from "../../../Assets/images/speedometer.png";
import CaloriesStat from "../../../Assets/images/calories.png";

const WishlistRecipeTeaser = ({ action, recipeId, isLast, isFirst }) => {
  const [recipe, setRecipe] = useState([]);
  

  const getRecipe = async (id) => {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);
    await setRecipe(docSnap.data());
  };

  useEffect(() => {
    getRecipe(recipeId);
  }, []);
  return (
    <div className="wishlist__recipe__teaser" style={{borderBottom: isLast ? '0' : '2px solid #ddd', borderTop: isFirst ? '2px solid #ddd' : '0'}}>
      <div className="wishlist__recipe__teaser__image">
        <Link
          to={`/recipes-app/recipes/${recipe.recipe_category}/${recipe.recipe_url}`}
        >
          <img src={recipe.recipe_image} alt={recipe.recipe_name} />
        </Link>
      </div>
      <div className="wishlist__recipe__teaser__details">
        <div className="wishlist__recipe__teaser__details__left">
          <div className="wishlist__recipe__teaser__category">
            {recipe.recipe_category}
          </div>
          <div className="wishlist__recipe__teaser__title">
            {recipe.recipe_name}
          </div>
        </div>
        <div className="wishlist__recipe__teaser__details__right">
          <div className="wishlist__teaser__stat">
            <p>{recipe.recipe_calories}</p>
            <img src={CaloriesStat} alt="Calories" />
          </div>
          <div className="wishlist__teaser__stat">
            <p>{recipe.recipe_difficulty}</p>
            <img src={DifficultyStat} alt="Difficulty" />
          </div>
          <div className="wishlist__teaser__stat">
            <p>{recipe.recipe_duration}</p>
            <img src={TimeStat} alt="Duration" />
          </div>
        </div>
      </div>
      <div className="wishlist__remove" onClick={action}>
        <img src={Trash} alt="Remove" />
      </div>
    </div>
  );
};
export default WishlistRecipeTeaser;
