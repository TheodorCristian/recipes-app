import React from "react";
import { Link } from "react-router-dom";
import "./Categoryteaser.scss";

const CategoryTeaser = ({ name, description, thumbnail }) => {
  return (
    <div className="category__teaser__card">
      <div className="category__teaser__circle">
        <img src={thumbnail} alt="Category thumbnail" />
      </div>
      <div className="category__teaser__content">
        <h1>{name}</h1>
        <p>{description}</p>
         
      </div>
    </div>
  );
};

export default CategoryTeaser;
