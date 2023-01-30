import React, { useState, useRef, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../Contexts/AuthContext";
import { getAccount } from "../../../../Utils/utils";
import { getAuth } from "firebase/auth";
import PageBackground from "../../../../Assets/images/white-background.png";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState({});

  let navigate = useNavigate();

  const setBackground = () => {
    let style = {
      backgroundImage: `url(${PageBackground})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      width: "100%",
      backgroundPosition: "center",
    };

    setStyle(style);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      let systemUser = await getAuth().currentUser;
      let accountRez = await getAccount(systemUser.uid);
      sessionStorage.setItem("systemUserId", systemUser.uid);
      sessionStorage.setItem("user", JSON.stringify(accountRez));
      sessionStorage.setItem("isAdmin", accountRez.data.isAdmin);
      accountRez.data.isAdmin ? navigate("/dashboard") : navigate("/home");
    } catch (error) {
      setError("Password or email are incorrect.");
      console.warn("Failed to login:" + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setBackground();
  }, []);

  return (
    <div className="login__container" style={style}>
      <h2 className="header">Log In</h2>
      {error && (
        <Alert show="true" variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <div className="login__content">
        <Form onSubmit={handleSubmit}>
          <div className="input__row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <div className="input__row">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} required />
          </div>
          <div className="login__buttons__action">
            <button
              className="action__button action__create"
              disabled={loading}
              type="submit"
            >
              Log in
            </button>
          </div>
        </Form>
        <p className="additional__link__text">
          Don't have a valid Account? <Link to="/signup">Create&nbsp;one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
