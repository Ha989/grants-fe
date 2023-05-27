import { Box } from "@mui/material";
import React from "react";

function ProjectBanner({ project }) {
  return (
    <Box
      width={{ xs: "100%", md: "75%" }}
      height={360}
      padding={1}
    >
      <img
        width="100%"
        height={340}
        src={project?.banner}
        alt={project?.name}
      />
    </Box>
  );
}

export default ProjectBanner;
