// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebaseAuthConfig";
// import RecipeTeaser from "../RecipeTeaser/RecipeTeaser";

// const WishlistPage = () => {
//   const [wishlistRecipe, setWishlistRecipe] = useState([]);
//   const [error, setError] = useState();

//   const rec = [];
//   const wish = [];

//   function getWishlistRecipes() {
//     wish.forEach((item) => {
//       let docRef = db.collection("recipes").where("recipe_name", "==", item);
//       docRef.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           rec.push(doc.data());
//         });
//       });
//     });
//   }

//   async function getWishlist() {
//     const colRef = db.collection("wishlist");
//     await colRef
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           // console.log(doc.data());
//           wish.push(doc.data().wishlist_recipe_name);
//         });
//       })
//       .catch((err) => {
//         setError(err);
//         alert(error);
//       });
//     getWishlistRecipes();
//     setWishlistRecipe(rec);
//   }

//   useEffect(() => {
//     getWishlist();
//     // console.log(wishlistRecipe);
//   }, [wishlistRecipe]);

//   return (
//     <>
//       {/* <ul>
//         {wishlistRecipe.map((recipe) => {
//           return (
//             <RecipeTeaser
//               name={recipe.recipe_name}
//               key={recipe.recipe_name}
//               image={recipe.recipe_image}
//               description={recipe.recipe_description}
//               category={recipe.recipe_category}
//               url={recipe.recipe_url}
//             />
//           );
//         })}
//       </ul> */}

//       {console.log(wishlistRecipe)}
//     </>
//   );
// };

// export default WishlistPage;
