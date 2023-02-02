import React, { useState, useEffect } from "react";
import { db } from "../../../../firebaseAuthConfig";
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import WishlistRecipeTeaser from "../../WishlistRecipeTeaser/WishlistRecipeTeaser";
import ClientHeader from "../../ClientHeader/ClientHeader";
import "./WishlistPage.scss";
import Back from "../../../General/Back/Back";
import ClientFooter from "../../ClientFooter/ClientFooter";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  let paragraph, firstTeaser, lastTeaser;
  let user = JSON.parse(sessionStorage.getItem("user"));

  const getWishlist = async () => {
    let docRef = doc(db, "accounts", user.accountRef);
    const docSnap = await getDoc(docRef);
    await setWishlist(docSnap.data().wishlist);
  };

  const handleDelete = async (recipeId) => {
    console.log(recipeId);
    const accountRef = doc(db, "accounts", user.accountRef);
    await updateDoc(accountRef, {
      wishlist: arrayRemove(recipeId),
    });
    getWishlist();
  };

  if (wishlist.length > 0) {
    paragraph = (
      <p>
        What are you waiting for? <br />
        Go and cook your favourite recipes!
      </p>
    );
  } else {
    paragraph = <p>You don't have wishlisted recipes... </p>;
  }

  useEffect(() => {
    getWishlist();
  }, [setWishlist]);

  return (
    <>
      <ClientHeader />
      <div className="back__icon__container">
        <Back />
      </div>
      <div className="wishlist__page__container">
        <h3>Your Wishlist</h3>
        <div className="wishlist__page__content">
          {paragraph}
          {wishlist.map((recipe, index) => {
            index === wishlist.length - 1
              ? (lastTeaser = true)
              : (lastTeaser = false);
            index === 0 ? (firstTeaser = true) : (firstTeaser = false);
            return (
              <WishlistRecipeTeaser
                action={() => handleDelete(recipe)}
                recipeId={recipe}
                key={recipe}
                isLast={lastTeaser}
                isFirst={firstTeaser}
              />
            );
          })}
        </div>
      </div>
      <ClientFooter />
    </>
  );
};

export default WishlistPage;
