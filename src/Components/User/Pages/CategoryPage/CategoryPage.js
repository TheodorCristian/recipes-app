import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./CategoryPage.scss";
import { db } from "../../../../firebaseAuthConfig";
import ClientHeader from "../../ClientHeader/ClientHeader";
import ClientFooter from "../../ClientFooter/ClientFooter"; 
import RecipeTeaser from "../../RecipeTeaser/RecipeTeaser";
import { Link } from "react-router-dom";
import Back from "../../../General/Back/Back";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState([]);
  const cat = [];

  const rec = [];
  let { id } = useParams();
  const style = {
    backgroundImage: `url(${category.category_background})`,
  };

  const getCategories = () => {
    const docRef = db.collection("categories").doc(id);
    docRef
      .get()
      .then((doc) => {
        setCategory(doc.data());
      })
      .catch((err) => setError(err));
  };

  async function getAllCategories() {
    const colRef = db.collection("categories");
    colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cat.push(doc.data());
      });
      setAllCategories(cat);
    });
  }

  const getRecipes = () => {
    const docRef = db.collection("recipes").where(`recipe_category`, "==", id);
    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rec.push(doc.data());
      });

      setRecipes(rec);
    });
  };

  useEffect(() => {
    getAllCategories();
    getCategories();
    getRecipes();
  }, [id]);
  return (
    <>
      <ClientHeader />
      <div className="category__page__content">
        <div className="category__page__presentation" style={style}></div>
        <div className="category__page__details">
          <div className="category__page__title">{category.category_name}</div>
          <div className="category__page__description">
            {category.category_description}
          </div>
        </div>
      </div>
      <div className="category__page">
        <div className="category__page__separator">&nbsp;</div>
        <div className="category__page__subtitle">
          <h3>We recommend</h3>
        </div>
        <div className="breadcrumb__menu__container">
          <div className="breadcrumb__menu">
            <span>
              <Link to={`/home`}>Home</Link>
            </span>
            / <span className="breadcrumb__active__link">{id}</span>
          </div>
        </div>
        <div className="recipe__teaser__container">
          <div className="categories__list">
            <ul className="categories">
              {allCategories.map((item, index) => {
                return (
                  <li className="category" key={index}>
                    <Link to={`/recipes/${item.category_name}`}>
                      {item.category_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="recipe__teaser__content">
            {recipes.map((recipe) => {
              return (
                <RecipeTeaser
                  name={recipe.recipe_name}
                  key={recipe.recipe_name}
                  image={recipe.recipe_image}
                  description={recipe.recipe_description}
                  category={recipe.recipe_category}
                  url={recipe.recipe_url}
                  time={recipe.recipe_duration}
                  difficulty={recipe.recipe_difficulty}
                  calories={recipe.recipe_calories}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ClientFooter />
      <Back />
    </>
  );
};

export default CategoryPage;
