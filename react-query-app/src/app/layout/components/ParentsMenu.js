/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ParentsMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const authReducer = useSelector(({ auth }) => auth);
  React.useEffect(() => {
    //set Show menu
    if (props.roles.length === 0) {
      //allow all roles
      setShowMenu(true);
    } else {
      // check if route is restricted by role
      let intersection = props.roles.filter((x) =>
        authReducer.roles.includes(x)
      );
      if (intersection.length > 0) {
        setShowMenu(true);
      }
    }
  }, [authReducer]);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      {showMenu && (
        <React.Fragment>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <Icon>{props.iconName}</Icon>
            </ListItemIcon>
            <ListItemText primary={props.text} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container style={{ paddingLeft: 20 }}>
              {props.children}
            </Grid>
          </Collapse>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

ParentsMenu.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
};

ParentsMenu.defaultProps = {
  iconName: "",
  text: "",
};

export default ParentsMenu;
