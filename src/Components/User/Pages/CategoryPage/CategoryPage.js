import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./CategoryPage.scss";
import { db } from "../../../../firebaseAuthConfig";
import ClientHeader from "../../ClientHeader/ClientHeader";
import ClientFooter from "../../ClientFooter/ClientFooter";
import RecipeTeaser from "../../RecipeTeaser/RecipeTeaser";
import { Link } from "react-router-dom";
import Back from "../../../General/Back/Back";
import { getDocs, collection, where, query } from "firebase/firestore";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState([]);
  const [appliedDurationFilters, setAppliedDurationFilters] = useState([]);
  const [appliedDifficultyFilters, setAppliedDifficultyFilters] = useState([]);
  const [durationFilter, setDurationFilter] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const cat = [];
  const navigate = useNavigate();

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

  const getAllCategories = async () => {
    const colRef = db.collection("categories");
    colRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cat.push(doc.data());
      });
      setAllCategories(cat);
    });
  };

  const getRecipesFilteredByDuration = async (filter) => {
    let filteredRecipes = [];
    const q = query(
      collection(db, "recipes"),
      where("recipe_duration", "==", filter),
      where("recipe_category", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => filteredRecipes.push(doc.data()));
    setRecipes(filteredRecipes);
  };

  const getRecipesFilteredByDurationMobile = async (e) => {
    e.preventDefault();
    let filteredRecipes = [];
    const q = query(
      collection(db, "recipes"),
      where("recipe_duration", "==", e.target.value),
      where("recipe_category", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => filteredRecipes.push(doc.data()));
    setRecipes(filteredRecipes);
  };
  const getRecipesFilteredByDifficulty = async (filter) => {
    let filteredRecipes = [];
    const q = query(
      collection(db, "recipes"),
      where("recipe_difficulty", "==", filter),
      where("recipe_category", "==", id)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => filteredRecipes.push(doc.data()));
    setRecipes(filteredRecipes);
  };

  const getRecipesFilteredByDifficultyMobile = async (e) => {
    e.preventDefault();
    let filteredRecipes = [];
    const q = query(
      collection(db, "recipes"),
      where("recipe_difficulty", "==", e.target.value),
      where("recipe_category", "==", id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => filteredRecipes.push(doc.data()));
    setRecipes(filteredRecipes);
  };

  const getRecipes = () => {
    const docRef = db.collection("recipes").where(`recipe_category`, "==", id);
    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        rec.push(doc.data());
      });

      setRecipes(rec);
    });
  };

  const goToCategory = (e) => {
    e.preventDefault();
    navigate(`/recipes/${e.target.value}`);
  };

  const getDurationFilters = async () => {
    let results = [];
    const querySnapshot = await getDocs(collection(db, "duration"));
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    await setDurationFilter(results);
  };

  const getDifficultyFilters = async () => {
    let results = [];
    const querySnapshot = await getDocs(collection(db, "difficulty"));
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    await setDifficultyFilter(results);
  };

  useEffect(() => {
    getAllCategories();
    getCategories();
    getRecipes();
    getDurationFilters();
    getDifficultyFilters();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, [setRecipes]);

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
          <div className="filters__container">
            <div className="category__filter">
              <p>Filter by Category</p>
              <div className="category__filter__container">
                {allCategories.map((item, index) => {
                  return (
                    <div className="category" key={index}>
                      <Link to={`/recipes/${item.category_name}`}>
                        {item.category_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="duration__filter">
              <p>Filter by Duration</p>
              <div className="duration__filter__container">
                {durationFilter.map((filter) => {
                  return (
                    <div
                      key={filter.name}
                      onClick={() => getRecipesFilteredByDuration(filter.name)}
                      className="filter"
                    >
                      <p>{filter.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="difficulty__filter">
              <p>Filter by Difficulty</p>
              <div className="difficulty__filter__container">
                {difficultyFilter.map((filter) => {
                  return (
                    <div
                      key={filter.name}
                      onClick={() =>
                        getRecipesFilteredByDifficulty(filter.name)
                      }
                      className="filter"
                    >
                      <p>{filter.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="filters__container__mobile">
            <div className="category__filter">
              <p>Filter by Category</p>
              <div className="category__filter__container">
                <select onChange={goToCategory} defaultValue="choose">
                  <option value="choose" disabled>
                    Choose Category
                  </option>
                  {allCategories.map((item, index) => {
                    return (
                      <option key={index} value={item.category_name}>
                        {item.category_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="duration__filter">
              <p>Filter by Duration</p>
              <div className="duration__filter__container">
                <select
                  onChange={getRecipesFilteredByDurationMobile}
                  defaultValue="choose"
                >
                  <option value="choose" disabled>
                    Choose Duration
                  </option>
                  {durationFilter.map((filter, index) => {
                    return (
                      <option key={index} value={filter.name}>
                        {filter.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="difficulty__filter">
              <p>Filter by Difficulty</p>
              <div className="difficulty__filter__container">
                <select
                  onChange={getRecipesFilteredByDifficultyMobile}
                  defaultValue="choose"
                >
                  <option value="choose" disabled>
                    Choose Difficulty
                  </option>
                  {difficultyFilter.map((filter, index) => {
                    return (
                      <option key={index} value={filter.name}>
                        {filter.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {recipes.length > 0 && (
            <div className="recipe__teaser__content">
              <div className="recipe__teaser__content__recipes">
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
          )}
        </div>
      </div>
      <ClientFooter />
      <Back />
    </>
  );
};

export default CategoryPage;
