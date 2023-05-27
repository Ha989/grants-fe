import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import background from "../images/background.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container maxWidth="100vw" maxheight="100vh">
      <Box
        maxwidth="100vw"
        height="80vh"
        display="flex"
        flexDirection={{ xs: "column", md: "row"}}
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Box p="10px">
          <Typography variant="h2" mb={5} color="primary"> Grants </Typography>
          <Typography variant="h6" >Our platform build is to help the founder of any project can create their own community grants.</Typography>
          <Typography variant="h6">We help the project out to solve their fundrasing problem. </Typography>
          <Typography variant="h6" mb={3}>Donate to the project you love to support them or create your powerful idea with us!</Typography>
          <Button variant="contained" component={Link} to="/projects">Explore Projects</Button>
        </Box>
        <Box width="70vw" height="60vh">
          <img src={background} alt="background" width="100%" height="100%" />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
