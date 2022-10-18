import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../../../../firebaseAuthConfig";
import CookingThumbnail from "../../../../Assets/images/cooking.png";
import IngredientsThumbnail from "../../../../Assets/images/recipe-book.png";
import "./RecipePage.scss";
import CookingStep from "../../CookingStep/CookingStep";
import TimeStat from "../../../../Assets/images/hourglass.png";
import DifficultyStat from "../../../../Assets/images/speedometer.png";
import CaloriesStat from "../../../../Assets/images/calories.png";
import ClientHeader from "../../ClientHeader/ClientHeader";
import { Link } from "react-router-dom";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  let { cat, id } = useParams();
  let uid = sessionStorage.getItem("userId");

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
    alert("This feature will be implemented soon!");
  };

  const handleCssCutWord = () => {
    let ingredients = document.getElementsByClassName("ingredients__list")[0];
    console.log(document.getElementsByClassName("ingredients__list")[0]);
    let ingredient = ingredients.getElementsByTagName("div");
    let checkboxes = ingredients.getElementsByTagName("input");
    let ingredientNames = ingredients.getElementsByTagName("p");

    for (let i = 0; i < ingredient.length; i++) {
      checkboxes[i].addEventListener("change", () => {
        ingredientNames[i].classList.toggle("ingredient-active");
      });
    }
  };
  async function getRecipes() {
    const docRef = db.collection("recipes").doc(id);
    await docRef.get().then((doc) => {
      setRecipe(doc.data());
      setCookingSteps(doc.data().cooking_steps);
      setIngredients(doc.data().recipe_ingredients);
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);
  useEffect(() => {
    handleCssEvent();
    handleCssCutWord();
    console.log(uid);
    console.log("something");
  });

  return (
    <div>
      <ClientHeader />
      <div className="recipe__page">
        <div className="breadcrumb__menu__container">
          <div className="breadcrumb__menu">
            <span>
              <Link to={`/recipes-app/home`}>Home</Link>
            </span>
            /
            <span>
              <Link to={`/recipes-app/recipes/${cat}`}>{cat}</Link>
            </span>
            / <span className="breadcrumb__active__link">{id}</span>
          </div>
        </div>
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
                <h2>Ingredients</h2>
                <div className="recipe__description__container">
                  <div className="recipe__ingredients__container">
                    <div className="ingredients__list">
                      {ingredients.map((item, index) => (
                        <div className="ingredient__pair" key={index + 1}>
                          <input type="checkbox" value={item} />
                          <p className="ingredient__name">{item}</p>
                        </div>
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
                      <button onClick={addToWishlist}>
                        Add to wishlist button
                      </button>
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
      </div>
    </div>
  );
};

export default RecipePage;
