/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from "react";
import { Grid } from "@material-ui/core";
import { Chip, Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import { green, red } from "@material-ui/core/colors";
function ColumnIsActive(props) {
  return (
    <div>
      {props.value !== null && (
        <Grid
          style={{ padding: 0, margin: 0 }}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Chip
            icon={
              props.value ? (
                <Icon style={{ backgroundColor: green[300], color: "#fff" }}>
                  done
                </Icon>
              ) : (
                <Icon style={{ backgroundColor: red[300], color: "#fff" }}>
                  cancel
                </Icon>
              )
            }
            style={{
              color: "#fff",
              backgroundColor: props.value ? green[300] : red[300],
            }}
            label={props.value ? props.activeText : props.inActiveText}
          />
        </Grid>
      )}
    </div>
  );
}

ColumnIsActive.propTypes = {
  value: PropTypes.bool,
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
};

ColumnIsActive.defaultProps = {
  value: null,
  activeText: "Active",
  inActiveText: "InActive",
};

export default ColumnIsActive;
