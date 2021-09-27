import React from "react";
import {
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as layoutRedux from "../_redux/layoutRedux";
import * as authRedux from "../../modules/_auth/_redux/authRedux";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import UserProfile from "./UserProfile";
import Icon from "@material-ui/core/Icon";

function UserMenu() {
  const authReducer = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const layoutReducer = useSelector(({ layout }) => layout);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const swithMode = () => {
    //todo switch mode
    if (layoutReducer.darkMode) {
      dispatch(layoutRedux.actions.updateDarkMode(!layoutReducer.darkMode));
    } else {
      dispatch(layoutRedux.actions.updateDarkMode(!layoutReducer.darkMode));
    }
  };

  const changePasswordClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    // window.open(CONST.SSO_URL_Changepassword, 'changePassword', params);
  };

  const logoutClick = () => {
    // const toggle = document.getElementById("kt_quick_user_toggle");
    // if (toggle) {
    //   toggle.click();
    // }
    // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    //     width=300,height=500,left=200,top=200`;
    // window.open(CONST.SSO_URL_LOGOUT, 'logged-out', params);
    // setAnchorEl(null);
    handleClose();
    dispatch(authRedux.actions.logout());
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          swithMode();
        }}
      >
        {layoutReducer.darkMode ? (
          <Icon fontSize="small" style={{ color: "#f27e2c" }}>
            light_mode
          </Icon>
        ) : (
          <Icon fontSize="small">dark_mode</Icon>
        )}
      </IconButton>

      {authReducer.user && (
        <React.Fragment>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Typography variant="caption">{authReducer.user}</Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {/* start  User Profile*/}
            <MenuItem>
              <UserProfile></UserProfile>
            </MenuItem>
            {/* end User Profile */}

            <Divider light />

            {/* start Change Password */}
            <MenuItem onClick={changePasswordClick}>
              <Chip
                size="small"
                icon={
                  <Icon style={{ fontSize: 20, marginLeft: 10 }}>
                    lock_open
                  </Icon>
                }
              />
              <Link
                style={{ color: "#000000", marginLeft: 20, marginBottom: 10 }}
                component="button"
                variant="inherit"
                onClick={() => {
                  changePasswordClick();
                }}
              >
                Change Password
                <Icon style={{ marginLeft: 200 }}>chevron_right</Icon>
              </Link>
            </MenuItem>
            {/* end Change Password */}

            {/* start Sign out*/}
            <MenuItem onClick={logoutClick}>
              <Chip
                size="small"
                style={{ marginTop: 10 }}
                icon={
                  <Icon style={{ fontSize: 20, marginLeft: 11 }}>logout</Icon>
                }
                color="default"
              />
              <Link
                style={{ color: "#000000", marginLeft: 20, marginTop: 10 }}
                component="button"
                variant="inherit"
                onClick={() => {
                  logoutClick();
                }}
              >
                Sign out
              </Link>
            </MenuItem>
            {/* end Sign out */}
          </Menu>
        </React.Fragment>
      )}
      {!authReducer.user && (
        <Tooltip title="Login">
          <IconButton
            onClick={() => {
              dispatch(layoutRedux.actions.showPopupLogIn());
            }}
          >
            <Icon fontSize="small" style={{ color: "#f27e2c" }}>
              login
            </Icon>
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default UserMenu;
