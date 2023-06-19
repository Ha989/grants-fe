import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Adjust the height as needed
    >
      <Typography variant="h5" color="primary" mb={2}>
        Dashboard <Divider />
      </Typography>
      <Box width={{ xs: "100%", md: "65%" }}>
        <Stack
          minHeight={150}
          direction={{ xs: "column", md: "row" }}
          p={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <TotalCalculateCard projects={projects} />
        </Stack>
      </Box>
      <Stack
        minHeight={300}
        direction={{ xs: "column", md: "row" }}
        p={1}
        justifyContent="space-between"
        mt={3}
      >
        <Box mt={2}>
          <Typography variant="h5" mb={1} textAlign="center" color="primary">
            Recent Donations
            <Divider />
          </Typography>
          <RecentDonationsCard projects={projects} />
        </Box>
        <Stack
          mt={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" mb={1} textAlign="center" color="primary">
            Revenue Distribution
            <Divider />
          </Typography>
          <RevenuePieChart projects={projects} />
        </Stack>
      </Stack>
      <Stack
        alignItems="center"
        minHeight={600}
        mt={3}
        width={{ xs: "90%", md: "70%" }}
      >
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
    </Box>
  );
}

export default CreatorDashboard;
