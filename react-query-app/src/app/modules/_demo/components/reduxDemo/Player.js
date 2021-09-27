/* eslint-disable no-restricted-imports */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardContent,Typography,Switch} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { red } from "@material-ui/core/colors";
import * as demoRedux from '../../_redux/demoRedux'

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  imposter: {
    fontSize: 14,
    color: red[500]
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Player(props) {
  const classes = useStyles();

    //const [check1, setCheck1] = React.useState(false)

    const dispatch = useDispatch()

    const demoReducer = useSelector(({ demo }) => demo);

    const turnswitch1Promise = () =>
    new Promise((resolve) => {
      dispatch(demoRedux.actions.turnSwitch1(!demoReducer.switch1));
      resolve();
    });

    const turnswitch2Promise = () =>
    new Promise((resolve) => {
      dispatch(demoRedux.actions.turnSwitch2(!demoReducer.switch2));
      resolve();
    });

    const turnswitch3Promise = () =>
    new Promise((resolve) => {
      dispatch(demoRedux.actions.turnSwitch3(!demoReducer.switch3));
      resolve();
    });


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={
            props.name === demoReducer.imposter
              ? classes.imposter
              : classes.title
          }
          color="textSecondary"
          gutterBottom
        >
          {props.name}
        </Typography>

        <Switch
          checked={demoReducer.switch1}
          onChange={() => {
            // setCheck1(!check1)
            dispatch(demoRedux.actions.turnSwitch1(!demoReducer.switch1));
          }}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Switch
          checked={demoReducer.switch2}
          onChange={() => {
            dispatch(demoRedux.actions.turnSwitch2(!demoReducer.switch2));
          }}
          name="checkedB"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Switch
          checked={demoReducer.switch3}
          onChange={() => {
            dispatch(demoRedux.actions.turnSwitch3(!demoReducer.switch3));
          }}
          name="checkedC"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />

        <button
          onClick={() => {
            console.log("turn switch1 start");
            turnswitch1Promise().then(() => {
              console.log("turn switch1 success");
              setTimeout(function () {
                console.log("turn switch2 start");
                turnswitch2Promise().then(() => {
                  console.log("turn switch2 success");
                  setTimeout(function () {
                    console.log("turn switch3 start");
                    turnswitch3Promise().then(() => {});
                    console.log("turn switch3 success");
                  }, 500);
                });
              }, 500);
            });
          }}
        >
          turn all (promise)
        </button>
        <button
          onClick={() => {
            dispatch(demoRedux.actions.turnSwitch1(!demoReducer.switch1));
            dispatch(demoRedux.actions.turnSwitch2(!demoReducer.switch2));
            dispatch(demoRedux.actions.turnSwitch3(!demoReducer.switch3));
          }}
        >
          turn all (async)
        </button>
      </CardContent>
    </Card>
  );
}