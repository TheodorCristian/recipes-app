import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import blueGrey from "@material-ui/core/colors/blueGrey";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./ProfileNavbarIcon.scss";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ProfileNavbarIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogOut() {
    await logout();
    localStorage.removeItem("isLoggedIn");
    history.push("/login");
  }

  const handleToWishlist = () => {
    history.push("/wishlist");
  };

  return (
    <div>
      <Button aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon
          className="account_thumbnail"
          style={{ fontSize: 40 }}
        />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <FaceIcon
            style={{ fontSize: 25, color: blueGrey[100], marginRight: 10 }}
          />
          <ListItemText primary="View Profile" />
        </StyledMenuItem>
        {/* <StyledMenuItem onClick={handleToWishlist}>
          <PlaylistAddCheckOutlinedIcon
            style={{ fontSize: 25, color: blueGrey[100], marginRight: 10 }}
          />
          <ListItemText primary="Wishlist" />
        </StyledMenuItem> */}
        {/* <StyledMenuItem>
          <ShoppingBasketIcon
            style={{ fontSize: 25, color: blueGrey[100], marginRight: 10 }}
          />
          <ListItemText primary="Shopping List" />
        </StyledMenuItem> */}
        <StyledMenuItem onClick={handleLogOut}>
          <ExitToAppIcon
            style={{ fontSize: 25, color: blueGrey[100], marginRight: 10 }}
          />
          <ListItemText primary="Log Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
