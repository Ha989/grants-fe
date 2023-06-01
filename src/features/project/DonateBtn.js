import React from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import Donation from "./Donation";


function DonateBtn({ project }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleDonate = () => {
    auth?.user ? (
     navigate(`/projects/${project._id}/donation/${auth?.user?._id}`)
    ) : (
      navigate("/auth/login")
    )
  }
  return (
    <Stack
      width={{ xs: "100%", md: "25%" }}
      padding={1}
      textAlign="center"
      justifyContent="space-between"

    > 
      <Box>
      <Typography variant="h3" fontWeight="bolder" color="primary.dark">
        ${project?.currentRaised}
      </Typography>
      <Typography variant="subtitle1" mb={3}>
        Raised
      </Typography>
      <Typography variant="h4" fontWeight="bolder" color="primary">
        {project?.totalDonations}
      </Typography>
      <Typography variant="subtitle1" mb={3} >
        Donors/Investors: 
      </Typography>
      <Divider />
      </Box>
      <Button size="large" variant="contained" onClick={handleDonate}>Donate</Button>
    </Stack>
  );
}

export default DonateBtn;
