import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../firebaseAuthConfig";
import { Form, Alert, Carousel } from "react-bootstrap";
import "./Signup.scss";
import "../../../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../Contexts/AuthContext";
import { getAccount } from "../../../../Utils/utils";
import Edit from "../../../../Assets/images/edit.png";
import DefaultAvatar from "../../../../Assets/images/default.png";
import PageBackground from "../../../../Assets/images/white-background.png";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { signup, login } = UserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(`${DefaultAvatar}`);

  let navigate = useNavigate();
  
  const getAvatars = async () => {
    const docRef = await getDocs(collection(db, "avatars"));
    docRef.forEach((doc) => {
      setAvatars((current) => [...current, doc.data()]);
    });
  };

  const closePopup = () => {
    document.querySelector(".avatars__popup__container").classList.add("hide");
    document.querySelector("body").classList.remove("hide__scrollbar");
  };

  const chooseAvatar = () => {
    document
      .querySelector(".avatars__popup__container")
      .classList.remove("hide");
    document.querySelector("body").classList.add("hide__scrollbar");
  };

  const handleSelectAvatar = (image) => {
    setSelectedAvatar(image);
    document.querySelector(".avatars__popup__container").classList.add("hide");
    document.querySelector("body").classList.remove("hide__scrollbar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match.");
    }
    if (!firstNameRef.current.value) {
      return setError("First Name cannot be empty.");
    }
    if (!lastNameRef.current.value) {
      return setError("Last Name cannot be empty.");
    }
    if (!emailRef.current.value) {
      return setError("Email cannot be empty.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await login(emailRef.current.value, passwordRef.current.value);
      let systemUser = await getAuth().currentUser;
      let data = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        isAdmin: false,
        uid: systemUser.uid,
        wishlist: [],
        avatar: selectedAvatar,
      };
      await addDoc(collection(db, "accounts"), data);
      let accountRez = await getAccount(systemUser.uid);
      sessionStorage.setItem("systemUserId", systemUser.uid);
      sessionStorage.setItem("user", JSON.stringify(accountRez));
      sessionStorage.setItem("isAdmin", accountRez.data.isAdmin);
      navigate("/home");
      console.log(data);
    } catch (error) {
      setError(
        "Unable to create account. Please check again your account details."
      );
      console.warn(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAvatars();
  }, [setAvatars]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="signup__container">
      <h2 className="header">Create new account</h2>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <div className="signup__content">
        {selectedAvatar && (
          <div className="avatar__section">
            <div className="avatar">
              <img src={selectedAvatar} alt="avatar" />
            </div>
            <div className="avatar__edit__icon" onClick={chooseAvatar}>
              <img src={Edit} alt="Edit Avatar" />
            </div>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <div className="input__row">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" ref={firstNameRef} required />
          </div>
          <div className="input__row">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" ref={lastNameRef} required />
          </div>
          <div className="input__row">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          <div className="input__row">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} required />
          </div>
          <div className="input__row">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              required
            />
          </div>
          <div className="signup__buttons__action">
            <button
              className="action__button action__create"
              disabled={loading}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </Form>
        <p className="additional__link__text">
          Already have an account? <Link to="/login">Log&nbsp;In</Link>
        </p>
      </div>
      <div className="avatars__popup__container hide">
        <div className="avatars__content">
          <h3>Choose your avatar</h3>
          <div className="avatars__carousel">
            <Carousel fade interval={null}>
              {avatars.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt="Avatar"
                    />
                    <div className="avatars__popup__action__buttons">
                      <button
                        className="action__button action__create"
                        onClick={() => handleSelectAvatar(item.image)}
                      >
                        Choose current
                      </button>
                      <button
                        className="action__button action__cancel"
                        onClick={closePopup}
                      >
                        Cancel
                      </button>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
