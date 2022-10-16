import React from "react";
import "./ProfileNavbarIcon.scss";
import ProfileIcon from "../../../Assets/images/profile.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function ProfileNavbarIcon() {
  const { logout } = useAuth();
  let navigate = useNavigate();

  async function handleLogout() {
    await logout();
    localStorage.setItem("isLoggedIn", false);
    navigate("/recipes-app/login");
  }
  return (
    <div className="profile__icon">
      <Link to="/recipes-app/profile">
        <img src={ProfileIcon} alt="Profile Icon" />
      </Link>
    </div>
  );
}

export default ProfileNavbarIcon;
