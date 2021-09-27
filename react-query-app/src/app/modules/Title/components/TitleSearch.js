/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button, Paper } from "@material-ui/core/";
import { Icon } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import FormikTextField from "../../_common/components/CustomFormik/FormikTextField";
import * as titleRedux from "../redux/titleRedux";

function TitleSearch() {
  const dispatch = useDispatch();
  const titleReducer = useSelector(({ title }) => title);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      searchText: titleReducer.searchValues.searchText,
    },
    onSubmit: (values) => {
      //submit ....
      let valuesToDispatch = {
        ...titleReducer.searchValues,
        searchText: values.searchText,
      };
      dispatch(titleRedux.actions.updateSearch(valuesToDispatch));
      formik.setSubmitting(false);
    },
  });

  React.useEffect(() => {
    return () => {
      dispatch(titleRedux.actions.reset());
    };
  }, []);

  const handleClickAdd = () => {
    dispatch(titleRedux.actions.openAdd());
  };

  return (
    <Paper elevation={3} style={{ marginBottom: 5, padding: 10 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={3}
          alignContent="center"
          justifyContent="center"
        >
          {/* Search */}
          <Grid item xs={12} lg={6}>
            <FormikTextField formik={formik} name="searchText" label="Search" />
          </Grid>

          <Grid container item xs={12} lg={2}>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              fullWidth
              color="default"
              variant="contained"
            >
              <Icon>search</Icon>
              Search
            </Button>
          </Grid>
          <Grid container item xs={12} lg={1}>
            <Button
              fullWidth
              onClick={handleClickAdd}
              color="primary"
              variant="contained"
            >
              Add +
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default TitleSearch;
