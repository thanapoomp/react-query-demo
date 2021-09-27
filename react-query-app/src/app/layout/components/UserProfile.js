/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from "react-redux";
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

function UserProfile() {
	const useStyle = makeStyles((theme) => ({
		image: {
			width: 50,
			height: 50,
		},
	}));
	const classes = useStyle();
	const authReducer = useSelector(({ auth }) => auth)
	return (
		<div>
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Paper elevation={0} style={{ marginRight: 5, padding: 5 }}>
					<img
						className={classes.image}
						alt=""
						src={process.env.PUBLIC_URL + "/default.jpg"}
					/>
				</Paper>
				<Typography variant="h6" style={{ color: "#847b7b" }}>User: </Typography>
				<Typography variant="h6" style={{ marginLeft: 5, color: "#000000" }}>{authReducer.user}</Typography>
			</Grid>
		</div>
	)
}

export default UserProfile
