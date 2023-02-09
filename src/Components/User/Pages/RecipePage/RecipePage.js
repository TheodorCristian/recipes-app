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
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import Back from "../../../General/Back/Back";
import Wishlisted from "../../../../Assets/images/checked.png";
import Add from "../../../../Assets/images/add.png";
import "../../../../App.css";
import { getAccount } from "../../../../Utils/utils";
import ClientFooter from "../../ClientFooter/ClientFooter";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [wishlisted, setWishlisted] = useState(Boolean);

  let { cat, id } = useParams();
  let user = JSON.parse(sessionStorage.getItem("user"));
  let systemUser = sessionStorage.getItem("systemUserId");
  let desktopFooterStyle = { display: "none" };

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

  const addToWishlist = async (recipeId) => {
    const accountRef = doc(db, "accounts", user.accountRef);
    await updateDoc(accountRef, {
      wishlist: arrayUnion(recipeId),
    });
    setWishlisted(true);
    document.querySelector("#wishlisted").classList.remove("hide");
    document.querySelector("#notWishlisted").classList.add("hide");
  };

  const handleCssCutWord = () => {
    let ingredients = document.getElementsByClassName("ingredients__list")[0];
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
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);
    setRecipe(docSnap.data());
    setCookingSteps(docSnap.data().cooking_steps);
    setIngredients(docSnap.data().recipe_ingredients);
  }

  async function fetchAccount() {
    let account = await getAccount(systemUser);
    return account;
  }

  async function checkIfRecipeIsWishlisted() {
    let wishlist;
    await fetchAccount()
      .then((acc) => (wishlist = acc.data.wishlist))
      .catch((err) => console.log(err));
    if (wishlist.indexOf(id) > -1) {
      document.querySelector("#wishlisted").classList.remove("hide");
      document.querySelector("#notWishlisted").classList.add("hide");
      setWishlisted(true);
    } else {
      document.querySelector("#wishlisted").classList.add("hide");
      document.querySelector("#notWishlisted").classList.remove("hide");
      setWishlisted(false);
    }
  }

  useEffect(() => {
    getRecipes();
    checkIfRecipeIsWishlisted();
  }, [setWishlisted]);

  useEffect(() => {
    handleCssEvent();
    handleCssCutWord();
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ClientHeader />
      <div className="recipe__page">
        <div className="back__icon__container">
          <Back />
        </div>
        <div className="breadcrumb__menu__container">
          <div className="breadcrumb__menu">
            <span>
              <Link to={`/home`}>Home</Link>
            </span>
            /
            <span>
              <Link to={`/recipes/${cat}`}>{cat}</Link>
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
                    <div className="recipe__wishlist__action__container">
                      <div
                        className="recipe__wishlist__action__content"
                        id="wishlisted"
                      >
                        <div className="wishlist__icon">
                          <img src={Wishlisted} alt="Wishlisted" />
                        </div>
                        <p>Wishlisted</p>
                      </div>
                      <div
                        className="recipe__wishlist__action__content"
                        id="notWishlisted"
                        onClick={() => addToWishlist(id)}
                      >
                        <div className="wishlist__icon">
                          <img src={Add} alt="Remove" />
                        </div>
                        <p>Add</p>
                      </div>
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
      <ClientFooter />
    </div>
  );
};

export default RecipePage;
