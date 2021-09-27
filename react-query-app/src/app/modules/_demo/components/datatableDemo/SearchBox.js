/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid } from "@material-ui/core/";
import FormikTextField from "../../../_common/components/CustomFormik/FormikTextField";
import ButtonWithProgress from "../../../_common/components/Buttons/ButtonWithProgress";
import AddButton from "../../../_common/components/Buttons/AddButton";

function SearchBox(props) {
  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      return errors;
    },
    initialValues: {
      productGroupName: "",
    },
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      props.updateSearch(values);
      formik.setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* Start productGroupName */}
        <Grid item xs={12} lg={4}>
          <FormikTextField
            formik={formik}
            name="productGroupName"
            label="ค้นหาจากชื่อ"
          />
        </Grid>

        <Grid item xs={12} lg={2}>
          <ButtonWithProgress
            type="submit"
            label="Search"
            loading={props.loading}
            color="primary"
          ></ButtonWithProgress>
        </Grid>
        <Grid item xs={12} lg={2}>
          <AddButton>New</AddButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default SearchBox;
