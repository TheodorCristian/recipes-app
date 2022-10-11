import React, { useState, useEffect } from "react";
import ClientHeader from "../../ClientHeader/ClientHeader";
import CategoryTeaser from "../../CategoryTeaser/CategoryTeaser";
import { db } from "../../../../firebaseAuthConfig";
import "./Home.scss";

const Home = () => {

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const cat = [];

  async function getCategories () {
    const colRef = await db.collection("categories");
    await colRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cat.push(doc.data());
        });
        setCategories(cat);
      })
      .catch((err) => {
        setError(err);
        alert(error);
      });
  }
  useEffect(() => {
    getCategories();
},[]);
  return (
    <div>
      <ClientHeader />
      <div>
        <ul className="category__teaser__container">
          {categories.map((item, index) => {
            return (
              <CategoryTeaser
                className="category__teaser__card"
                name={item.category_name}
                description={item.category_description}
                thumbnail={item.category_thumbnail}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
