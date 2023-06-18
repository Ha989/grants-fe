import { Box, Container, Divider, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByCreator } from "./creatorSlice";
import TotalCalculateCard from "./TotalCalculateCard";
import RecentDonationsCard from "./RecentDonationsCard";
import RevenuePieChart from "./RevenuePieChart";
import EarningGraph from "./EarningGraph";
import { useNavigate } from "react-router-dom";

function CreatorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.creator.projects);


  const handleClickCreate = () => {
    navigate("/creators");
  };

  useEffect(() => {
    dispatch(getProjectsByCreator());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h5" color="primary" mb={2}>
        Dashboard <Divider />
      </Typography>

      <Stack
        minHeight={150}
        direction={{ xs: "column", md: "row" }}
        p={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <TotalCalculateCard projects={projects} />
      </Stack>
      <Stack
        minHeight={300}
        direction={{ xs: "column", md: "row" }}
        p={1}
        justifyContent="space-between"
        mt={3}
      >
        <Box mt={2} >
          <Typography variant="h5" mb={1} textAlign="center" color="primary">
            Recent Donations
            <Divider />
          </Typography>
          <RecentDonationsCard projects={projects} />
        </Box>
        <Stack mt={2} direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h5" mb={1} textAlign="center" color="primary">
            Revenue Distribution
            <Divider />
          </Typography>
          <RevenuePieChart projects={projects} />
        </Stack>
      </Stack>
      <Stack minHeight={400} mt={3}>
        <Typography variant="h5" mb={1} textAlign="center" color="primary">
          Monthly Dataset
        </Typography>
       <EarningGraph projects={projects} />
      </Stack>
      <Fab
        variant="extended"
        color="info"
        onClick={handleClickCreate}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
        aria-label="add"
      >
        <AddIcon />
        Create Your Project
      </Fab>
    </Container>
  );
}

export default CreatorDashboard;
