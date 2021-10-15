// import React, { useContext, useState, useEffect } from "react";

// const WishlistContext = React.createContext();

// export function useWishlist() {
//   return useContext(WishlistContext);
// }

// export function WishlistProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);
//   const wishlistItem = localStorage.getItem("wishlistStorage");
//   useEffect(() => {
//     console.log(wishlistItem);
//   }, []);
//   const value = {
//     wishlist,
//     setWishlist,
//   };

//   return (
//     <WishlistContext.Provider value={value}>
//       {children}
//     </WishlistContext.Provider>
//   );
// }
