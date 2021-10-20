import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../../../firebaseAuthConfig";
import CookingThumbnail from "../../../Assets/images/cooking.png";
import IngredientsThumbnail from "../../../Assets/images/recipe-book.png";
import "./RecipePage.scss";
import CookingStep from "../CookingStep/CookingStep";
import ClientHeader from "../ClientHeader/ClientHeader";
import TimeStat from "../../../Assets/images/hourglass.png";
import DifficultyStat from "../../../Assets/images/speedometer.png";
import CaloriesStat from "../../../Assets/images/calories.png";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  let { id } = useParams();

  const handleCssEvent = () => {
    let tabHeader = document.getElementsByClassName(
      "recipe__page__tab__header"
    )[0];
    let tabIndicator = document.getElementsByClassName(
      "recipe__page__tab__indicator"
    )[0];
    let tabBody = document.getElementsByClassName("recipe__page__tab__body")[0];

    let tabsPane = tabHeader.getElementsByTagName("div");

    for (let i = 0; i < tabsPane.length; i++) {
      tabsPane[i].addEventListener("click", function () {
        tabHeader
          .getElementsByClassName("active")[0]
          .classList.remove("active");
        tabsPane[i].classList.add("active");
        tabBody.getElementsByClassName("active")[0].classList.remove("active");
        tabBody
          .getElementsByClassName("recipe__page__tab__body__info")
          [i].classList.add("active");
        tabIndicator.style.left = `calc(calc(100% / 2) * ${i} + calc(100% / 8))`;
      });
    }
  };

  const addToWishlist = () => {
    console.log("Recipe added to wishlist");
  };

  const handleCssCutWord = () => {
    let ingredients = document.getElementsByClassName("ingredients__list")[0];
    let ingredient = ingredients.getElementsByTagName("div");

    for (let i = 0; i < ingredient.length; i++) {
      ingredient[i].addEventListener("click", () => {
        ingredient[i].classList.add("ingredient-active");
      });
    }
  };

  useEffect(() => {
    async function getRecipes() {
      const docRef = db.collection("recipes").doc(id);
      await docRef.get().then((doc) => {
        setRecipe(doc.data());
        setCookingSteps(doc.data().cooking_steps);
        setIngredients(doc.data().recipe_ingredients);
      });
    }
    getRecipes();
  }, []);

  useEffect(() => {
   handleCssEvent();
  handleCssCutWord();
  })

  return (
    
    <>
   
      <div className="recipe__page__container">
        <div className="recipe__page__content">
          <div className="recipe__page__tab__header">
            <div className="active">
              <span>
                <img src={IngredientsThumbnail} alt="Ingredients" />
              </span>
              <p>Ingredients</p>
            </div>
            <div>
              <span>
                <img src={CookingThumbnail} alt="Cooking" />
              </span>
              <p>Cooking</p>
            </div>
          </div>
          <div className="recipe__page__tab__indicator"></div>
          <div className="recipe__page__tab__body">
            <div className="active recipe__page__tab__body__info">
              <h2>Section</h2>
              <div className="recipe__description__container">
                <div className="recipe__ingredients__container">
                  <div className="ingredients__list">
                    {ingredients.map((item, index) => (
                      <div key={index + 1}>{item}</div>
                    ))}
                  </div>
                </div>
                <div className="recipe__description__content">
                  <div className="recipe__title__subtitle">
                    <h2>{recipe.recipe_name}</h2>
                    <p>{recipe.recipe_description}</p>
                  </div>
                  <div className="recipe__cal__dif__prep__information">
                    <div className="recipe__difficulty">
                      <img src={DifficultyStat} alt="Difficulty" />
                      <p>{recipe.recipe_difficulty}</p>
                    </div>
                    <div className="recipe__prep__time">
                      <img src={TimeStat} alt="Difficulty" />
                      <p>{recipe.recipe_duration}</p>
                    </div>
                    <div className="recipe__calories">
                      <img src={CaloriesStat} alt="Difficulty" />
                      <p>{recipe.recipe_calories}</p>
                    </div>
                  </div>
                  <div className="recipe__add__to__wishlist">
                    <button onClick={addToWishlist}>Add to wishlist</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="recipe__page__tab__body__info">
              <h2>How it's made?</h2>
              {cookingSteps.map((item, index) => (
                <CookingStep id={index + 1} key={index + 1} name={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="recipe__page__image">
          <img src={recipe.recipe_image} alt={recipe.recipe_name} />
        </div>
      </div>
    </>
  );
};

export default RecipePage;
