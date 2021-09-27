/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import CustomDateBE from "../../../_common/components/CustomFormik/CustomDateBE";
import FormikRouterPrompt from "../../../_common/components/CustomFormik/FormikRouterPrompt";
import * as swal from "../../../_common/components/SweetAlert";
function FormWithCustomDateBE() {
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.birthDate) {
        errors.birthDate = "invalid date";
      }

      return errors;
    },
    initialValues: {
      birthDate: "1986-05-09T17:00:00.000Z",
    },
    onSubmit: (values) => {
      swal.swalInfo("info", JSON.stringify(values, null, 2)).then((res) => {
        formik.setSubmitting(false);
        formik.resetForm();
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikRouterPrompt formik={formik}></FormikRouterPrompt>
      <Grid container spacing={3}>
        {/* Title */}
        <Grid item xs={12} lg={3}>
          <CustomDateBE formik={formik} name="birthDate" label="วันเกิด" />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.dirty}
            fullWidth
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            onClick={() => {
              history.push("/demo/formDemo");
            }}
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
      <br></br>
      dirty: {JSON.stringify(formik.dirty)}
    </form>
  );
}

export default FormWithCustomDateBE;
