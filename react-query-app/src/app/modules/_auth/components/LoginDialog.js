import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import Slide from "@material-ui/core/Slide";
import { useSelector, useDispatch } from "react-redux";
import FormikTextField from "../../_common/components/CustomFormik/FormikTextField";
import * as authCrud from "../_redux/authCrud";
import * as authRedux from "../_redux/authRedux";
import { Icon } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  const dispatch = useDispatch();
  const authReducer = useSelector(({ auth }) => auth);
  const [state] = React.useState({
    username: "",
    password: "",
  });

  const loginPromise = (loginDetail) =>
    new Promise((resolve) => {
      dispatch(authRedux.actions.renewToken(loginDetail));
      resolve();
    });

  const handleCloseDialog = (event, reason) => {
    if (reason !== "backdropClick") {
      //avoid click on backdrop
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "required";
      }

      if (!values.password) {
        errors.password = "required";
      }

      return errors;
    },
    initialValues: {
      username: state.username,
      password: state.password,
    },
    onSubmit: (values) => {
      authCrud
        .login(values.username, values.password)
        .then((res) => {
          // debugger
          if (res.data.isSuccess) {
            let token = res.data.data;
            let loginDetail = {};

            //get token
            loginDetail.authToken = token;

            //get user
            loginDetail.user = authCrud.getUserByToken(token);

            // get exp
            let exp = authCrud.getExp(token);
            loginDetail.exp = exp;

            //get roles
            loginDetail.roles = authCrud.getRoles(token);

            loginPromise(loginDetail).then(() => {
              handleCloseDialog();
            });
          } else {
            alert(res.data.message);
            dispatch(authRedux.actions.logout());
          }
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <Dialog
      open={!authReducer.user}
      TransitionComponent={Transition}
      onClose={handleCloseDialog}
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: 250,
          paddingTop: 15,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 15,
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            lg={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Icon fontSize="large" style={{ color: "#f27e2c" }}>
              face
            </Icon>
          </Grid>

          {/* username */}
          <Grid item xs={12} lg={12}>
            <FormikTextField formik={formik} name="username" label="Username" />
          </Grid>

          {/* password */}
          <Grid item xs={12} lg={12}>
            <FormikTextField
              formik={formik}
              password
              name="password"
              label="Password"
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <Button
              type="submit"
              disabled={formik.isSubmitting || !formik.dirty}
              fullWidth
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}
