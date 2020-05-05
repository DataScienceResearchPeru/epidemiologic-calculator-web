import React from "react";
import { Container, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    padding: "80px 100px",
    boxShadow: '0px 1px 6px #00000029',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <Header />
      <Box>
        <NavBar className={classes.boxContent} />
      </Box>
    </Container>
  );
};

export default Dashboard;
