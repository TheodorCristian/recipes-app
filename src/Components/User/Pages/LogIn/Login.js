import React, { useState, useRef, useEffect } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../../firebaseAuthConfig";
import { Card, Button, Container, Form, Alert } from "react-bootstrap";
import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      const accountsRef = collection(db, "accounts");
      const q = query(
        accountsRef,
        where("email", "==", emailRef.current.value)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().isAdmin)
        if (doc.data().isAdmin === true) {
          history.push("/dashboard");
        } else {
          history.push("/home");
        }
      });
    } catch (error) {
      setError("Failed to Log In" + error);
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        className="w-100 log-in-container"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100 mb-4 d-flex align-items-center justify-content-center card-container">
          <Card>
            <Card.Body>
              <h2 className="text-center ">Log In</h2>
              {error && (
                <Alert show="true" variant="danger">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} type="submit">
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <p>
              Don't have a valid Account?{" "}
              <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;