import React, { useEffect, useRef, useState, forceUpdate } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  query,
  where,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Carousel } from "react-bootstrap";
import { getAuth, deleteUser } from "firebase/auth";
import { db } from "../../../../firebaseAuthConfig";
import "./UserProfile.scss";
import "../../../../App.css";
import ClientHeader from "../../ClientHeader/ClientHeader";
import ClientFooter from "../../ClientFooter/ClientFooter";
import LogOut from "../../../../Assets/images/log-out.png";
import Wishlist from "../../../../Assets/images/wishlist.png";
import { UserAuth } from "../../../../Contexts/AuthContext";
import { getAccount } from "../../../../Utils/utils";
import Back from "../../../General/Back/Back";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [inputActive, setInputActive] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [updateDummyState, setUpdateDummyState] = useState(true);

  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let user = JSON.parse(sessionStorage.getItem("user"));
  let systemUser = getAuth().currentUser;

  const getAccountDetails = () => {
    setFirstName(user.data.first_name);
    setLastName(user.data.last_name);
    setEmail(user.data.email);
    setAvatar(user.data.avatar);
  };

  const getAvatars = async () => {
    let avatarsArr = [];
    const docRef = await getDocs(collection(db, "avatars"));
    docRef.forEach((doc) => {
      avatarsArr.push(doc.data());
    });
    setAvatars(avatarsArr);
  };

  const logOut = async () => {
    try {
      await logout();
      sessionStorage.setItem("user", null);
      sessionStorage.setItem("systemUserId", null);
      sessionStorage.setItem("isAdmin", null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
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
  };

  const updateAccountDetails = async () => {
    const accountRef = doc(db, "accounts", user.accountRef);
    const newData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      avatar: selectedAvatar !== "" ? selectedAvatar : user.data.avatar,
    };
    await updateDoc(accountRef, newData);

    let accountRez = await getAccount(systemUser.uid);
    sessionStorage.setItem("user", JSON.stringify(accountRez));

    setUpdateDummyState(!updateDummyState);
    hideEditPopUp();
  };

  const wishlist = () => {
    navigate("/wishlist");
  };

  const displayDeletePopUp = () => {
    document.querySelector(".account__delete__popup").classList.remove("hide");
    document.querySelector("body").classList.add("hide__scrollbar");
  };

  const displayEditPopUp = () => {
    document.querySelector(".account__edit__popup").classList.remove("hide");
    document.querySelector("body").classList.add("hide__scrollbar");
  };

  const hideDeletePopUp = () => {
    document.querySelector(".account__delete__popup").classList.add("hide");
    document.querySelector("body").classList.remove("hide__scrollbar");
  };

  const hideEditPopUp = () => {
    document.querySelector(".account__edit__popup").classList.add("hide");
    document.querySelector("body").classList.remove("hide__scrollbar");
  };

  const handleSelectAvatar = (image) => {
    setSelectedAvatar(image);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAccountDetails();
    getAvatars();
  }, []);

  useEffect(() => {
    getAccountDetails();
  }, [updateDummyState]);

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
      <div className="account__edit__popup hide">
        <div className="account__edit__popup__container">
          <h3>Edit Account</h3>
          <div className="account__edit__popup__content">
            <div className="avatars__content">
              <div className="avatars__carousel">
                <Carousel fade interval={null}>
                  {avatars.map((item, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block"
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
                        </div>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
            <div className="input__row">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                ref={firstNameRef}
                required
                defaultValue={user.data.first_name}
              />
            </div>
            <div className="input__row">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                ref={lastNameRef}
                required
                defaultValue={user.data.last_name}
              />
            </div>
            <div className="account__popup__buttons">
              <button
                className="action__button action__create"
                onClick={updateAccountDetails}
              >
                Update Account
              </button>
              <button
                className="action__button action__cancel"
                onClick={hideEditPopUp}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ClientHeader />
      <div className="account__container">
        <div className="account__logout__button" onClick={logOut}>
          <img src={LogOut} alt="Log Out image" />
        </div>
        <div className="account__wishlist__button" onClick={wishlist}>
          <img src={Wishlist} alt="Wishlist image" />
        </div>
        <div className="account__avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <h3>account details</h3>
        <div className="account__details">
          <div className="input__row">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              disabled={inputActive}
            />
          </div>
          <div className="input__row">
            <label htmlFor="firstName">Last name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              disabled={inputActive}
            />
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
            <button
              className="action__button action__edit"
              onClick={displayEditPopUp}
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>

      <Back />
      <ClientFooter />
    </div>
  );
};

export default UserProfile;
