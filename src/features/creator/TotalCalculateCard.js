import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsByCreator } from "./creatorSlice";
import { Box, IconButton, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

function TotalCalculateCard({ projects }) {
  
  const calculateTotalRevenue = (projects) => {
    return projects?.reduce(
      (total, project) => total + project.currentRaised,
      0
    );
  };
  const calculateTotalBookmarked = (projects) => {
    return projects?.reduce(
      (total, project) => total + project.totalBookmarks,
      0
    );
  };

  const calculateTotalDonations = (projects) => {
    return projects?.reduce(
      (total, project) => total + project.totalDonations,
      0
    );
  };

  return (
        <>
          <Box
            width={300}
            borderRadius={1}
            textAlign="center"
            backgroundColor="#f5f5f5"
            p={1}
            mb={2}
          >
            <IconButton color="warning">
              <MonetizationOnIcon />
            </IconButton>
            <Typography variant="h7" fontWeight="bold" color="#ff7700">
              {" "}
              Total Revenue{" "}
            </Typography>
            <Typography variant="h4" color="primary">
              $ {calculateTotalRevenue(projects)}
            </Typography>
          </Box>
          <Box
            width={300}
            borderRadius={1}
            textAlign="center"
            backgroundColor="#f5f5f5"
            p={1}
            mb={2}
          >
            <IconButton color="info">
              <PeopleOutlineIcon />
            </IconButton>
            <Typography variant="h7" fontWeight="bold" color="#338fff">
              {" "}
              Total Donations
            </Typography>
            <Typography variant="h4" color="primary">
              {calculateTotalDonations(projects)}
            </Typography>
          </Box>
          <Box
            width={300}
            borderRadius={1}
            textAlign="center"
            backgroundColor="#f5f5f5"
            p={1}
            mb={2}
          >
            <IconButton color="error">
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant="h7" fontWeight="bold" color="error">
              {" "}
              Total User Bookmarked
            </Typography>
            <Typography variant="h4" color="primary">
              {calculateTotalBookmarked(projects)}
            </Typography>
          </Box>
        </>
  );
}

export default TotalCalculateCard;
