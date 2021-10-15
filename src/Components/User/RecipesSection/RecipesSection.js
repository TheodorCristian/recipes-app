import React from "react";
import "./RecipesSection.scss";

const RecipesSection = () => {
  return (
    <>
      <div className="recipesSection__title__container">
        <h1 className="recipesSection__title">
          Welcome to the Recipe section!
        </h1>
        <h3 className="recipesSection__subtitle">
          Here you can choose and try a lot of recipes,
          <br /> discover your inner chef and cook with your favorite
          ingredients!
        </h3>
      </div>
      <div className="recipesSection__content__container">
        <p>Categories - Recommended recipes</p>
        
      </div>
    </>
  );
};

export default RecipesSection;
