import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../../../firebaseAuthConfig";

const RecipePage = () => {
  const [recipe, setRecipe] = useState([]);
  let rec = [];
  let { id } = useParams();
  const getRecipes = () => {
    const docRef = db.collection("recipes").doc(id);

    docRef.get().then((doc) => {
      setRecipe(doc.data());
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <h3>{recipe.recipe_name}</h3>
      <p>{recipe.recipe_description}</p>
    </div>
  );
};

export default RecipePage;
