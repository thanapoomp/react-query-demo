/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from "prop-types";
import { yellow } from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(yellow[300]),
      backgroundColor: yellow[300],
      '&:hover': {
        backgroundColor: yellow[500],
      },
    },
}));

function EditButton(props) {
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
      startIcon={<EditIcon />}
    >{props.children}</Button>
  );
}


EditButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

EditButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default EditButton;
