import React from "react";
import { Typography, Container, Grid, Paper, Button, Box } from "@mui/material";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Logo from '../../../image/logo.png';

const SupportPage = () => {
  return (
    <>
      <Header />
      <PathHead pageName="Dashboard > Support" screen="Get_Item" pageLink="/MainPage" />

      <Container style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" style={{ marginTop: "20px", marginBottom: "40px", fontFamily: 'cursive' }}>
          CRYSTAL SOLUTION
        </Typography>

        <Box textAlign="center" mb={4}>
          <img src={Logo} alt="Company Logo" style={{ width: "150px", height: "auto" }} />
        </Box>

        <Paper elevation={3} style={{ padding: "20px", marginTop: "40px", backgroundColor: "#e0e0e0", borderRadius: '10px' }}>
          <Typography variant="h6" gutterBottom align="center">
            15-D, Al Makkah Colony, Butt Chowk, Lahore, Pakistan
          </Typography>
          <Typography variant="body1" align="center">
            {/* Additional information or description */}
          </Typography>

          <Typography variant="body1" align="center" style={{ marginTop: "10px" }}>
            Email: support@crystalsolutions.com.pk
          </Typography>
          <Typography variant="body1" align="center">
            Phone: 0302-8427221
          </Typography>
          <Typography variant="body1" align="center">
            Phone: 0304-4770075
          </Typography>

          {/* <Button variant="contained" color="primary" size="large" fullWidth style={{ marginTop: "20px" }}>
            Contact Us
          </Button> */}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default SupportPage;
