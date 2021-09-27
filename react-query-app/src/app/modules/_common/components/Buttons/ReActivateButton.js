/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import PropTypes from "prop-types";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[300]),
    backgroundColor: blue[300],
    "&:hover": {
      backgroundColor: blue[500],
    },
  },
}));

function ReActivateButton(props) {
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
      startIcon={<RotateLeftIcon />}
    >
      {props.children}
    </Button>
  );
}

ReActivateButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

ReActivateButton.defaultProps = {
  name: "please-set-name",
  disabled: false,
  label: "please-set-label",
  fullWidth: true,
};

export default ReActivateButton;
