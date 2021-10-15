import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import "./CategoryPage.scss";
import { db } from "../../../firebaseAuthConfig";
import ClientHeader from "../ClientHeader/ClientHeader";
import RecipeTeaser from "../RecipeTeaser/RecipeTeaser";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState([]);

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

  const getRecipes = () => {
    const docRef = db.collection("recipes").where(`recipe_category`, "==", id);
    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rec.push(doc.data());
      });

      setRecipes(rec);
      console.log(recipes);
    });
  };

  useEffect(() => {
    getCategories();
    getRecipes();
  }, [id]);
  return (
    <>
      <ClientHeader />
      <div className="category__page__presentation" style={style}>
        <div className="blurbg">
          <div className="category__page__details">
            <div className="category__page__title">
              {category.category_name}
            </div>
            <div className="category__page__description">
              {category.category_description}
            </div>
          </div>
        </div>
      </div>
      <div className="recipeTeaser__container">
        {recipes.map((recipe) => {
          return (
            <RecipeTeaser
              name={recipe.recipe_name}
              key={recipe.recipe_name}
              image={recipe.recipe_image}
              description={recipe.recipe_description}
              category={recipe.recipe_category}
              url={recipe.recipe_url}
            />
          );
          // console.log(recipe);
        })}
      </div>
    </>
  );
};

export default CategoryPage;
