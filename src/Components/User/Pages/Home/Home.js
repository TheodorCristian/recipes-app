import React, { useState, useEffect } from "react";
import ClientHeader from "../../ClientHeader/ClientHeader";
import CategoryTeaser from "../../CategoryTeaser/CategoryTeaser";
import { db } from "../../../../firebaseAuthConfig";
import "./Home.scss";
import HomeOne from "../../../../Assets/images/home-one.jpg";
import HomeTwo from "../../../../Assets/images/home-two.jpg";
import HomeThree from "../../../../Assets/images/home-three.jpg";
import HomeFour from "../../../../Assets/images/home-four.jpg";
import HomeFive from "../../../../Assets/images/home-five.jpg";
import HomeSix from "../../../../Assets/images/home-six.jpg";
import HomeSeven from "../../../../Assets/images/home-seven.jpg";
import HomeEight from "../../../../Assets/images/home-eight.jpg";
import HomeNine from "../../../../Assets/images/home-nine.jpg";
import HomeTen from "../../../../Assets/images/home-ten.jpg";
import ClientFooter from "../../ClientFooter/ClientFooter";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [style, setStyle] = useState({});
  const [error, setError] = useState("");
  const cat = [];

  async function getCategories() {
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

  function setBackground() {
    let style = {};
    let bgs = [
      HomeOne,
      HomeTwo,
      HomeThree,
      HomeFour,
      HomeFive,
      HomeSix,
      HomeSeven,
      HomeEight,
      HomeNine,
      HomeTen,
    ];
    let randomNo = Math.floor(Math.random() * bgs.length);
    style.backgroundImage = `url(${bgs[randomNo]})`;
    style.backgroundSize = "cover";
    style.height = "100vh";
    style.width = "100%";
    style.backgroundPosition = "center";
    style.margin = "0";
    style.padding = "0";
    setStyle(style);
  }
  useEffect(() => {
    getCategories();
    setBackground();
  }, []);
  return (
    <div>
      <ClientHeader />
      <div className="home__container">
        <div className="home__introduction" style={style}>
          <div className="home__overlay"></div>
          <div className="home__details">
            <h1>Fooddyy</h1>
            <p>
              Discover delicious recipes and elevate your cooking game with Fooddyy!
            </p>
          </div>
        </div>
        <div className="home__content">
          <div className="home__banner">
            <p>
              Fooddyy is a revolutionary recipe app that allows food enthusiasts
              to discover new and delicious dishes with ease. With an
              easy-to-use interface and a wide variety of recipe categories,
              you'll never run out of meal ideas again. Create an account and
              add your favorite recipes to your wishlist for easy access and
              meal planning.
            </p>
          </div>
          <div className="home__categories__container">
            <h3>Check Out our categories</h3>
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
          <div className="home__banner">
            <p>
              Impress your friends and family with your cooking skills, whether
              you're a beginner or a seasoned chef, Fooddyy has something for
              everyone. And with the ability to add and remove recipes from your
              wishlist, you'll be able to tailor your recipe search to your
              specific&nbsp;needs.
            </p>
          </div>
        </div>
      </div>
      <ClientFooter />
    </div>
  );
};

export default Home;
