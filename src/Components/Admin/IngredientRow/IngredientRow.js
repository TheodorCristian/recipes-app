import React from "react";
import { useHistory } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseAuthConfig";
import "./IngredientRow.scss";

const IngredientRow = ({ name, id }) => {
  let history = useHistory();
  const handleEdit = () => {
    history.push(`/edit-ingredient/${id}`);
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete " + name + "?")) {
      await deleteDoc(doc(db, "ingredients", id));
    }
  };

  return (
    <div className="flex">
      <p>{name}</p>
      <div className="admin__buttons__container">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default IngredientRow;
