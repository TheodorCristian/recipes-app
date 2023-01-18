import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../firebaseAuthConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const EditRecipe = () => {
  const [recipe, setRecipe] = useState([]);
  let recipeNameRef = useRef();
  let { id } = useParams();

  // async function getRecipes() {
  //   const docRef = db.collection("recipes").doc(id);
  //   await docRef.get().then((doc) => {
  //     setRecipe(doc.data());
  //     console.log(doc.data());
  //   });
  // }

  async function getRecipes2() {
    try {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      await setRecipe(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRecipes2();
  }, []);

  return (
    <div>
      <p>{recipe.recipe_name}</p>
      <p>{recipe.recipe_description}</p>
    </div>
  );
};

export default EditRecipe;
