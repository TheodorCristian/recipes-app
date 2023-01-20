import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseAuthConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.scss";
import RecipeRow from "../RecipeRow/RecipeRow";
import { createId } from "../../../Utils/utils";
import IngredientRow from "../IngredientRow/IngredientRow";
import { UserAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {logout, user, setUser, setIsAdmin} = UserAuth();
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  async function getRecipes() {
    const colRef = await db.collection("recipes");
    await colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setRecipes((current) => [...current, doc.data()]);
      });
    });
  }

  const logOut = async () => {
    try {
      await logout();
      await setUser({});
      await setIsAdmin(false);
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }

  async function getIngredients() {
    const colRef = await db.collection("ingredients");
    await colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setIngredients((current) => [...current, doc.data()]);
      });
    });
  }

  useEffect(() => {
    getRecipes();
    getIngredients();
  }, []);

  return (
    <>
      <div className="admin__dashboard">
      <button onClick={logOut}>LGO OUT</button>
        <div className="admin__left__panel">leftside</div>
        <div className="admin__right__panel">
          <div className="admin__recipe__table">
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
            <div className="admin__category__table"></div>
            <div className="admin__ingredient__table">
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
