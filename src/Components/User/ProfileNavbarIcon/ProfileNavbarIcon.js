import React from "react";
import "./ProfileNavbarIcon.scss";
import ProfileIcon from "../../../Assets/images/profile.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function ProfileNavbarIcon() {
  const { logout } = useAuth();
  let history = useHistory();

  async function handleLogout() {
    await logout();
    localStorage.setItem("isLoggedIn", false);
    history.push("/login");
  }
  return (
    <div className="profile__icon">
      <Link to="/profile">
        <img src={ProfileIcon} alt="Profile Icon" />
      </Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default ProfileNavbarIcon;
