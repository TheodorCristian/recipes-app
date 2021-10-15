import React, { useEffect, useState } from "react";
import { db } from "../firebaseAuthConfig";
import { Link } from "react-router-dom";

const Test = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const cat = [];

  useEffect(() => {
    const colRef = db.collection("categories");
    colRef
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
  }, []);

  console.log(categories);
  return (
    <>
      <ul>
        {categories.map((item) => {
          return (
            <Link
              to={`/category/${item.category_name}`}
              key={item.category_name}
            >
              <li>{item.category_name}</li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Test;
