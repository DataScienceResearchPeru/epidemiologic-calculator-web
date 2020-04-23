import React from "react";
import { Container, Grid, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import LineAreaGraphic from "../components/LineGraphic/LineGraphic";

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    padding: '80px 100px',
  },
}))

const DashboardPage = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box className={classes.boxContent}>
          <Grid container>
            <NavBar />
          </Grid>
        </Box>
        <LineAreaGraphic></LineAreaGraphic>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default DashboardPage;
