import React, { useState } from "react";
import "./ShoppingListItem.scss";
import Remove from "../../../Assets/images/trash.png";

const ShoppingListItem = ({
  title,
  deleteAction,
  checkedInitialValue,
  updateCheck,
}) => {
  return (
    <div className="shopping__list__item" key={title}>
      <input
        type="checkbox"
        checked={checkedInitialValue}
        id={title}
        name={title}
        onChange={updateCheck}
        value={title}
      />
      <p>{title}</p>
      <div className="shopping__list__item__remove" onClick={deleteAction}>
        <img src={Remove} alt="Remove Item" />
      </div>
    </div>
  );
};

export default ShoppingListItem;
