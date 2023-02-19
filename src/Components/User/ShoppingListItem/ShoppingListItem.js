import React, { useEffect } from "react";
import "./ShoppingListItem.scss";
import Remove from "../../../Assets/images/trash.png";

const ShoppingListItem = ({
  title,
  deleteAction,
  checkedInitialValue,
  updateCheck,
  itemId,
}) => {

  return (
    <div
      id={itemId}
      name={title}
      value={title}
      key={title}
      className="shopping__list__item"
    >
      <div className="shopping__list__item__info" onClick={updateCheck}>
        {checkedInitialValue == true ? (
          <div className="item__checkbox__active"></div>
        ) : (
          <div className="item__checkbox"></div>
        )}
        <p>{title}</p>
      </div>
      <div className="shopping__list__item__remove" onClick={deleteAction}>
        <img src={Remove} alt="Remove Item" />
      </div>
    </div>
  );
};

export default ShoppingListItem;
