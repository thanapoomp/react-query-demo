/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import * as layoutRedux from "../_redux/layoutRedux";
function MenuItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const authReducer = useSelector(({ auth }) => auth);
  const [showMenu, setShowMenu] = React.useState(false);

  const preventDefault = (event) => event.preventDefault();

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

  return (
    <React.Fragment>
      {showMenu && (
        <ListItem
          button
          onClick={() => {
            history.push(props.path);
            dispatch(layoutRedux.actions.updateDrawerOpen(false));
          }}
        >
          <ListItemIcon>
            <Icon>{props.iconName}</Icon>
          </ListItemIcon>
          <Link
            underline="none"
            href={`${window.location.origin}/#${props.path}`}
            onClick={preventDefault}
            color="inherit"
          >
            {props.text}
          </Link>
        </ListItem>
      )}
    </React.Fragment>
  );
}

MenuItem.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  path: PropTypes.string,
  roles: PropTypes.array,
};

MenuItem.defaultProps = {
  iconName: "",
  text: "",
  path: "",
  roles: [],
};

export default MenuItem;
