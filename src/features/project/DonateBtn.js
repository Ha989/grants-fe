import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";

function DonateBtn({ project }) {
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
        435
      </Typography>
      <Typography variant="subtitle1" mb={3} >
        Donors/Investors: 
      </Typography>
      <Divider />
      </Box>
      <Button size="large" variant="contained">Donate</Button>
    </Stack>
  );
}

export default DonateBtn;
