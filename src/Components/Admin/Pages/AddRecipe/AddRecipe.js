import React, { useEffect, useRef, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { db, storage } from "../../../../firebaseAuthConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createId } from "../../../../Utils/utils";
import "./AddRecipe.scss";
import Add from "../../../../Assets/images/add.png";

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
    } catch (error) {
      console.log(error);
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
    if (e.target.checked === true) {
      await setCheckedIngredients((current) => [...current, e.target.value]);
    } else {
      let helperArr = [...checkedIngredients];
      let index = helperArr.indexOf(e.target.value);
      helperArr.splice(index, 1);
      await setCheckedIngredients(helperArr);
    }
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
      <div className="add__recipe__container">
        <div>
          <div id="recipeName" className="form__field">
            <p className="form__label">Recipe Name</p>
            <input
              type="text"
              ref={recipeNameRef}
              required
              className="form__input"
              placeholder="E.g.: Mac and Cheese"
            />
          </div>
          <div className="form__field">
            <p className="form__label">Category Name</p>
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
          <div id="recipeDescription" className="form__field">
            <p className="form__label">Recipe Description</p>
            <input
              type="text"
              ref={recipeDescriptionRef}
              required
              className="form__input"
              placeholder="E.g.: Quick, easy, and tasty macaroni and cheese dish. "
            />
          </div>
          <div id="recipeCalories" className="form__field">
            <p className="form__label">Number of calories / portion</p>
            <input
              type="text"
              ref={recipeCaloriesRef}
              required
              className="form__input"
              placeholder="E.g.: 254"
            />
          </div>
          <div id="recipeDuration" className="form__field">
            <p className="form__label">
              Recipe Preparation Time (preparation + cooking)
            </p>
            <input
              type="text"
              ref={recipeDurationRef}
              required
              className="form__input"
              placeholder="E.g.: 50"
            />
          </div>
          <div id="recipeDifficulty" className="form__field">
            <p className="form__label">
              Recipe difficulty (easy, medium, hard)
            </p>
            <input
              type="text"
              ref={recipeDifficultyRef}
              required
              className="form__input"
              placeholder="E.g.: easy"
            />
          </div>
          <div className="form__field">
            <p className="form__label">Cooking steps</p>
            <div className="add__ingredient">
              <input
                type="text"
                ref={cookingStepRef}
                placeholder="Cooking step"
                className="form__input"
              />
              <img onClick={addCookingStep} src={Add}></img>
            </div>
            <ol>
              {cookingSteps.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ol>
          </div>
          <div className="admin__recipe__ingredients form__field">
            <p className="form__label">Choose Ingredients</p>
            {ingredients.map((item, index) => {
              return (
                <div key={index} className="admin__recipe__ingredient">
                  <input
                    type="checkbox"
                    name={createId(item.ingredient_name)}
                    value={createId(item.ingredient_name)}
                    onClick={checkIngredient}
                    className="admin__ingredient__input"
                  />
                  <p className="admin__ingredient__label">
                    {item.ingredient_name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="form__field">
            <p className="form__label">Recipe Image</p>
            <div className="add__image">
              <input type="file" ref={imageRef} className="form__input" />
              <img onClick={handleImageUpload} src={Add}></img>
            </div>
            <div>
              <h3>Progress: {progress} %</h3>
            </div>
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
