import React from "react";
import "./AdminHeader.scss";
import LouOutIcon from "../../../Assets/images/log-out-white.png";
import { UserAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();

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

  return (
    <div className="admin__header">
      <div className="admin__logout" onClick={logOut}>
        <img src={LouOutIcon} alt="Logout" />
      </div>
    </div>
  );
};

export default AdminHeader;
