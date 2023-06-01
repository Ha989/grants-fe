import { Box } from "@mui/material";
import React from "react";
import ReactPlayer from 'react-player'

function ProjectBanner({ project }) {
  return (
    <Box
      width={{ xs: "100%", md: "75%" }}
      height={360}
      padding={1}
    >
      <ReactPlayer 
      width="100%"
      height={350}
      url={project?.video}
      />
    </Box>
  );
}

export default ProjectBanner;
