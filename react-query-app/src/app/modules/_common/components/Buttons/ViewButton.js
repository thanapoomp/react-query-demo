/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from "prop-types";
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(blueGrey[300]),
      backgroundColor: blueGrey[300],
      '&:hover': {
        backgroundColor: blueGrey[500],
      },
    },
}));

function ViewButton(props) {
  const classes = useStyles();
  return (
    <Button 
      {...props}
      variant="contained"
      className={classes.root}
      name={props.name}
      disabled={props.disabled}
      label={props.label}
      fullWidth={props.fullWidth}
      startIcon={<VisibilityIcon />}
    >{props.children}</Button>
  );
}

ViewButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

ViewButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default ViewButton;
