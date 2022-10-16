import React from "react";
import ProfileNavbarIcon from "../ProfileNavbarIcon/ProfileNavbarIcon";
import "./ClientHeader.scss";
import { Link } from "react-router-dom";
import Logo from "../../../Assets/images/Logo.png";

const ClientHeader = () => {
  return (
    <div className="navigation">
      <div className="logo__container">
        <Link to="/recipes-app/home">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="profile__icon__container">
        <ProfileNavbarIcon />
      </div>
    </div>
  );
};

export default ClientHeader;
