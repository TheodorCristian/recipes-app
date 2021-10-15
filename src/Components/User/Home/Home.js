import React, { useState, useEffect } from "react";
import ClientHeader from "../ClientHeader/ClientHeader";
import RecipesSection from "../RecipesSection/RecipesSection";
import { db } from "../../../firebaseAuthConfig";
import { Link } from "react-router-dom";

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
      <ul>
        {categories.map((item) => {
          return (
            <Link
              to={`/recipes/${item.category_name}`}
              key={item.category_name}
            >
              <li>{item.category_name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
