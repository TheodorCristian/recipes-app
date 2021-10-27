import React from "react";
import "./ProfileNavbarIcon.scss";
import ProfileIcon from "../../../Assets/images/profile.png";
import { Link } from "react-router-dom";


function ProfileNavbarIcon() {

  return (
    <div className="profile__icon">
      <Link to ="/profile"><img src={ProfileIcon} alt="Profile Icon" /></Link>
    </div>
  );
}

export default ProfileNavbarIcon