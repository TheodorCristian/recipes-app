import React, { useEffect, useRef, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { db, storage } from "../../../firebaseAuthConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createId } from "../../../Utils/utils";
import { useHistory } from "react-router-dom";
import "./AddRecipe.scss";

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  let recipeNameRef = useRef();
  let recipeDescriptionRef = useRef();
  let recipeCaloriesRef = useRef();
  let recipeDurationRef = useRef();
  let recipeDifficultyRef = useRef();
  let cookingStepRef = useRef();
  let imageRef = useRef();

  let history = useHistory();

  async function addRecipe(e) {
    let data = {};
    e.preventDefault();
    data.recipe_name = recipeNameRef.current.value;
    data.recipe_id = createId(recipeNameRef.current.value);
    data.recipe_category = checkedCategory;
    data.recipe_description = recipeDescriptionRef.current.value;
    data.recipe_calories = recipeCaloriesRef.current.value;
    data.recipe_duration = recipeDurationRef.current.value;
    data.recipe_difficulty = recipeDifficultyRef.current.value;
    data.cooking_steps = cookingSteps;
    data.recipe_ingredients = checkedIngredients;
    data.recipe_image = imageUrl;
    data.recipe_url = createId(recipeNameRef.current.value);
    try {
      setLoading(true);
      await setDoc(
        doc(db, "recipes", createId(recipeNameRef.current.value)),
        data
      );
      setIsSuccess(true);
      data = {};
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function getIngredients() {
    const colRef = await db.collection("ingredients");
    await colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setIngredients((current) => [...current, doc.data()]);
      });
    });
  }

  async function getCategories() {
    const colRef = await db.collection("categories");
    await colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCategories((current) => [...current, doc.data()]);
      });
    });
  }
  async function checkIngredient(e) {
    await setCheckedIngredients((current) => [...current, e.target.value]);
  }

  async function checkCategory(e) {
    e.preventDefault();
    await setCheckedCategory(e.target.value);
  }

  async function addCookingStep() {
    await setCookingSteps((current) => [
      ...current,
      cookingStepRef.current.value,
    ]);
    cookingStepRef.current.value = "";
  }

  async function uploadImage(file) {
    if (!file) return;
    const storageRef = ref(storage, `img/recipes/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      }
    );
  }

  async function handleImageUpload() {
    let file = imageRef.current.files[0];
    await uploadImage(file);
  }

  //CSS EVENTS
  function handleCssMakeGreenLabel() {
    let ingredients = document.getElementsByClassName(
      "admin__recipe__ingredients"
    )[0];
    let ingredient = ingredients.getElementsByTagName("div");
    let checkbox = ingredients.getElementsByTagName("input");
    let label = ingredients.getElementsByTagName("p");

    for (let i = 0; i < ingredient.length; i++) {
      checkbox[i].addEventListener("change", () => {
        label[i].classList.toggle("ingredient-active");
      });
    }
  }

  useEffect(() => {
    getIngredients();
    getCategories();
  }, []);

  useEffect(() => {
    handleCssMakeGreenLabel();
  }, []);

  return (
    <div>
      {isSuccess && (
        <Alert show="true" variant="success">
          Recipe uploaded successfully!
        </Alert>
      )}
      {loading && <div className="overlayer"> </div>}
      <div className="">
        <div>
          <div id="recipeName">
            <p>Recipe Name</p>
            <input type="text" ref={recipeNameRef} required />
          </div>
          <div>
            <select onChange={checkCategory} defaultValue="choose">
              <option value="choose" disabled>
                Choose Category
              </option>
              {categories.map((item, index) => {
                return (
                  <option key={index} value={item.category_name}>
                    {item.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div id="recipeDescription">
            <p>Recipe Description</p>
            <input type="text" ref={recipeDescriptionRef} required />
          </div>
          <div id="recipeCalories">
            <p>Number calories / portion</p>
            <input type="text" ref={recipeCaloriesRef} required />
          </div>
          <div id="recipeDuration">
            <p>Recipe Preparation Time (preparation + cooking)</p>
            <input type="text" ref={recipeDurationRef} required />
          </div>
          <div id="recipeDifficulty">
            <p>Recipe difficulty (easy, medium, hard)</p>
            <input type="text" ref={recipeDifficultyRef} required />
          </div>
          <div>
            <input
              type="text"
              ref={cookingStepRef}
              placeholder="Cooking step"
            />
            <button onClick={addCookingStep}>Add Cooking step</button>
            <ol>
              {cookingSteps.map((item, index) => {
                console.log(item);
                return <li key={index}>{item}</li>;
              })}
            </ol>
          </div>
          <div className="admin__recipe__ingredients">
            {ingredients.map((item, index) => {
              return (
                <div key={index} className="admin__recipe__ingredient">
                  <input
                    type="checkbox"
                    name={createId(item.ingredient_name)}
                    value={createId(item.ingredient_name)}
                    onChange={checkIngredient}
                    className="admin__ingredient__input"
                  />
                  <p className="admin__ingredient__label">
                    {item.ingredient_name}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            <input type="file" ref={imageRef} />
            <button onClick={handleImageUpload}>Upload image</button>
          </div>
          <div>
            <h3>Progress: {progress} %</h3>
          </div>
          <Button disabled={loading} onClick={addRecipe}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
