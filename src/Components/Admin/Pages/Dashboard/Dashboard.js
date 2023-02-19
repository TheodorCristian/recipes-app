import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.scss";
import RecipeRow from "../../RecipeRow/RecipeRow";
import { createId } from "../../../../Utils/utils";
import IngredientRow from "../../IngredientRow/IngredientRow";
import { Link } from "react-router-dom";
import AdminHeader from "../../AdminHeader/AdminHeader";
import { getDocs, collection, getDoc, Timestamp } from "firebase/firestore";
import { adminDashboardFetch } from "../../../../Utils/utils";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRecipes = async () => {
    let arr = await adminDashboardFetch("recipes");
    setRecipes(arr);
  };

  const getIngredients = async () => {
    let arr = await adminDashboardFetch("ingredients");
    setIngredients(arr);
  };

  const getCategories = async () => {
    let arr = await adminDashboardFetch("categories");
    setCategories(arr);
  };

  useEffect(() => {
    getRecipes();
    getIngredients();
    getCategories();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="admin__dashboard">
        <div className="admin__left__panel">
          <div className="admin__left__panel__pages__links">
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/recipes"}>Recipes</Link>
            </div>
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/categories"}>Categories</Link>
            </div>
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/ingredients"}>Ingredients</Link>
            </div>
          </div>
          <div className="separator"></div>
          <div className="admin__left__panel__pages__links">
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/recipes"}>Add Recipe</Link>
            </div>
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/categories"}>Add Category</Link>
            </div>
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/ingredients"}>Add Ingredient</Link>
            </div>
          </div>
          <div className="separator"></div>
          <div className="admin__left__panel__pages__links">
            <div className="admin__left__panel__pages__link">
              <Link to={"/admin/avatars"}>Avatars</Link>
            </div>
          </div>
        </div>
        <div className="admin__right__panel">
          <div className="admin__recipe__table">
            <h3>Recipes</h3>
            {recipes.map((item, index) => {
              return (
                <RecipeRow
                  key={index}
                  id={item.recipe_url}
                  name={item.recipe_name}
                />
              );
            })}
          </div>
          <div className="admin__category__recipe__container">
            <div className="admin__category__table">
              <h3>Categories</h3>
            </div>
            <div className="admin__ingredient__table">
              <h3>Ingredients</h3>
              {ingredients.map((item, index) => {
                return (
                  <IngredientRow
                    key={index}
                    id={createId(item.ingredient_name)}
                    name={item.ingredient_name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
