import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import BookmarkProject from './BookmarkProject';

function ProjectHeader({ project }) {
  return (
    <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            padding={1}
          >
            <Stack
              direction="row"
              width={{ xs: "100%", md: "75%" }}
              minheight={50}
            >
              <img
                width={40}
                height={40}
                src={project?.logo}
                alt={project?.name}
              />
              <Stack
                direction="column"
                width="100%"
               padding={1}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  {project?.name}
                </Typography>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: "sans-serif", fontStyle: "italic" }}
                  >
                    {project?.title}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Box width="20%" height={40} textAlign="end">
              <BookmarkProject project={project}/>
            </Box>
          </Stack>
    
  )
}

export default ProjectHeader;