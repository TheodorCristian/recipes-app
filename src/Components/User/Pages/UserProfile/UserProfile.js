import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { getAuth, deleteUser } from "firebase/auth";
import { db } from "../../../../firebaseAuthConfig";
import "./UserProfile.scss";
import "../../../../App.css";
import ClientHeader from "../../ClientHeader/ClientHeader";
import LogOut from "../../../../Assets/images/log-out.png";
import Wishlist from "../../../../Assets/images/wishlist.png";
import { UserAuth } from "../../../../Contexts/AuthContext";
import Back from "../../../General/Back/Back";
import { Alert } from "react-bootstrap";

const UserProfile = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [avatar, setAvatar] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = UserAuth();
  let user = JSON.parse(sessionStorage.getItem("user"));
  let systemUser = getAuth().currentUser;

  const getAccountDetails = async () => {
    await setFirstName(user.data.first_name);
    await setLastName(user.data.last_name);
    await setEmail(user.data.email);
    await setAvatar(user.data.avatar);
  };

  const logOut = async () => {
    try {
      await logout();
      sessionStorage.setItem("user", null);
      sessionStorage.setItem("systemUserId", null);
      sessionStorage.setItem("isAdmin", null);
      navigate("/login");
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    try {
      setError("");
      setLoading(true);
      let accountId;
      const accountRef = collection(db, "accounts");
      const q = query(accountRef, where("uid", "==", user.data.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        accountId = doc.id;
      });
      deleteUser(systemUser)
        .then(() => {
          deleteDoc(doc(db, "accounts", accountId));
          navigate("/signup");
        })
        .catch((error) => {
          console.log(error);
        });
      document.querySelector("body").classList.remove("hide__scrollbar");
    } catch (err) {
      setError("Failed to delete the account: " + err);
    }
    setLoading(false);
  };

  const wishlist = () => {
    navigate("/wishlist");
  };

  const displayDeletePopUp = () => {
    document.querySelector(".account__delete__popup").classList.remove("hide");
    document.querySelector("body").classList.add("hide__scrollbar");
  };
  const hideDeletePopUp = () => {
    document.querySelector(".account__delete__popup").classList.add("hide");
    document.querySelector("body").classList.remove("hide__scrollbar");
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <div className="account__page">
      <div className="account__delete__popup hide">
        <div className="account__delete__popup__container">
          <h3>Are you sure?</h3>
          <p>You will permanently delete your account.</p>
          <div className="account__popup__buttons">
            <button
              className="action__button action__delete"
              onClick={deleteAccount}
              disabled={loading}
            >
              Delete Account
            </button>
            <button
              className="action__button action__cancel"
              onClick={hideDeletePopUp}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ClientHeader />
      {error && (
        <Alert show="true" variant="danger">
          {error}
        </Alert>
      )}
      <div className="account__container">
        <div className="account__logout__button" onClick={logOut}>
          <img src={LogOut} alt="Log Out image" />
        </div>
        <div className="account__wishlist__button" onClick={wishlist}>
          <img src={Wishlist} alt="Wishlist image" />
        </div>
        {avatar !== "" && (
          <div className="account__avatar">
            <img src={avatar} alt="Avatar" />
          </div>
        )}
        <h3>account details</h3>
        <div className="account__details">
          <div className="input__row">
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" value={firstName} disabled />
          </div>
          <div className="input__row">
            <label htmlFor="firstName">Last name</label>
            <input type="text" id="lastName" value={lastName} disabled />
          </div>
          <div className="input__row">
            <label htmlFor="firstName">Email</label>
            <input type="text" id="email" value={email} disabled />
          </div>
          <div className="account__button__actions">
            <button
              className="action__button action__delete"
              onClick={displayDeletePopUp}
            >
              Delete Account
            </button>
            <button className="action__button action__edit">
              Edit Account
            </button>
          </div>
        </div>
      </div>
      <Back />
    </div>
  );
};

export default UserProfile;
