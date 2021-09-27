import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import MenuItem from "./components/MenuItem";
import ParentsMenu from "./components/ParentsMenu";
import { ROLES } from "../../Constant";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ASideMenuList() {
  const classes = useStyles();

  return (
    <List
      dense
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListSubheader component="div" id="nested-list-subheader">
        Menu
      </ListSubheader>
      <Divider />

      <MenuItem iconName="home" text="Home" path="/"></MenuItem>

      <MenuItem iconName="quiz" text="Test" path="/test"></MenuItem>

      <ParentsMenu
        iconName="admin_panel_settings"
        text="Admin"
        roles={[ROLES.admin]}
      >
        <MenuItem
          iconName="star"
          text="Titles"
          path="/title"
          roles={[ROLES.admin]}
        ></MenuItem>
        {/* <MenuItem
          iconName="star"
          text="ProductGroups"
          path="/productGroups"
          roles={[ROLES.admin]}
        ></MenuItem> */}
      </ParentsMenu>
    </List>
  );
}
