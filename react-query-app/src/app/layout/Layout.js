import React from "react";
import TitleAppBar from "./TitleAppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerMenu from "./DrawerMenu";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import "../../index.css";
import LoginDialog from "../modules/_auth/components/LoginDialog";
function Layout(props) {
  // const authReducer = useSelector(({ auth }) => auth);
  const layoutReducer = useSelector(({ layout }) => layout);

  const theme = createTheme({
    palette: {
      type: layoutReducer.darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: ["Sarabun", "sans-serif"].join(","),
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        {/* {authReducer.user && ( */}
        <React.Fragment>
          <TitleAppBar></TitleAppBar>
          <DrawerMenu></DrawerMenu>
        </React.Fragment>
        {/* )} */}

        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth="lg">{props.children}</Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <LoginDialog></LoginDialog>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Layout;
