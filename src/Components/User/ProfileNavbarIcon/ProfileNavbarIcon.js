import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileNavbarIcon.scss";
import { Button, Menu, MenuItem, Divider } from "@material-ui/core";

function ProfileNavbarIcon() {
  let user = JSON.parse(sessionStorage.getItem("user")).data;
  let userName = user.first_name;
  let userAvatar = user.avatar;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToWishlist = () => {
    navigate("/wishlist");
  };

  const logout = async () => {
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
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div className="menu__opener">
          <img src={userAvatar} alt="Avatar"></img>
          <p>Hello, {userName}</p>
        </div>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={goToProfile}>MY PROFILE</MenuItem>
        <MenuItem onClick={goToWishlist}>WISHSLIST</MenuItem>
        {/*<MenuItem onClick={handleClose}>SHOPPING LIST</MenuItem>*/}
        <Divider />
        <MenuItem onClick={logout}>LOG OUT</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileNavbarIcon;
