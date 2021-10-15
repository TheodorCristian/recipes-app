import React from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import "./WishlistRecipeTeaser.scss";

const WishlistRecipeTeaser = (image, name, description) => {
  return (
    <div className="wishlist__recipe__teaser">
      <div className="wishlist__recipe__teaser__image">
        <img src={image} alt={name} />
      </div>
      <div className="wishlist__recipe__teaser__details">
        <div className="wishlist__recipe__teaser__title">{name}</div>
        <div className="wishlist__recipe__teaser__description">
          {description}
        </div>
      </div>
      <div className="wishlist__remove">
        <RemoveCircleIcon />
      </div>
    </div>
  );
};
export default WishlistRecipeTeaser;
