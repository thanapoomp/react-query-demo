/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(green[300]),
      backgroundColor: green[300],
      '&:hover': {
        backgroundColor: green[500],
      },
    },
}));

function AddButton(props) {
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
      startIcon={<AddIcon />}
    >{props.children}</Button>
  );
}

AddButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

AddButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default AddButton;
