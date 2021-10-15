import React, { useState, useEffect } from "react";
import ClientHeader from "../ClientHeader/ClientHeader";
import RecipesSection from "../RecipesSection/RecipesSection";
import CategoryTeaser from "../CategoryTeaser/CategoryTeaser";
import { db } from "../../../firebaseAuthConfig";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const cat = [];
  useEffect(() => {
    const colRef = db.collection("categories");
    colRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cat.push(doc.data());
          console.log(cat);
        });
        setCategories(cat);
      })
      .catch((err) => {
        setError(err);
        alert(error);
      });
  }, []);
  return (
    <div>
      <ClientHeader />
      <RecipesSection />
      <div>
        <ul className="category__teaser__container">
          {categories.map((item) => {
            return (
              <CategoryTeaser
                className="category__teaser__card"
                name={item.category_name}
                description={item.category_description}
                thumbnail={item.category_thumbnail}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
