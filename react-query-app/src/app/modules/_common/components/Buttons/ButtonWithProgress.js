import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function ButtonWithProgress(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        type={props.type}
        disabled={props.loading}
        fullWidth
        color={props.color}
        variant="contained"
      >
        {props.label}
      </Button>
      {props.loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}

ButtonWithProgress.propTypes = {
    loading: PropTypes.bool,
    type: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string
  };
  
  // Same approach for defaultProps too
  ButtonWithProgress.defaultProps = {
    bool: false,
    type: 'button',
    color: 'primary',
    label: 'button text'
  };

export default ButtonWithProgress;
