import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddIngredient = () => {
  const [loading, setLoading] = useState(false);
  let temporaryIngredientRef = useRef();
  function addIngredient(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className="" style={{ marginTop: "50px" }}>
        <Form onSubmit={addIngredient}>
          <Form.Group id="recipeId">
            <Form.Label>Ingredient Name</Form.Label>
            <Form.Control type="text" ref={temporaryIngredientRef} required />
          </Form.Group>
          <Button disabled={loading} type="submit">
            Add Ingredient
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddIngredient;
