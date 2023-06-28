import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Donate from "./Donate";

function DonateBtn({ project }) {
  const auth = useAuth();
  const userId = auth?.user?._id;

  return (
    <Stack
      width={{ xs: "100%", md: "25%" }}
      padding={1}
      textAlign="center"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h4" fontWeight="bolder" color="primary.dark">
          ${project?.currentRaised.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          Raised
        </Typography>
        <Typography variant="h5" fontWeight="bolder" color="primary">
          {project?.totalDonations}
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          Donors/Investors:
        </Typography>
        <Divider />
      </Box>
      <Donate project={project} userId={userId} />
    </Stack>
  );
}

export default DonateBtn;
