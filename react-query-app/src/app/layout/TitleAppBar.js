import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import * as layoutRedux from "./_redux/layoutRedux";
import * as CONST from "../../Constant";
import UserMenu from "./components/UserMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TitleAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ marginBottom: 10 }} color="default">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => {
              dispatch(layoutRedux.actions.updateDrawerOpen(true));
            }}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" className={classes.title}>
            {CONST.APP_INFO.name}
          </Typography>

          <React.Fragment>
            <UserMenu />
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}
