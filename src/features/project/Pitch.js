import { Box, Container, IconButton, Stack, Typography, Link, List, ListItem, ListItemText } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProject } from "./projectSlice";

function Pitch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);
  return (
    <Container>
      <Stack direction="column">
      <Stack direction="row" mt={3} padding={1} justifyContent="space-between">
        <Box width="80%" padding={1}>
          <Typography variant="h5" fontWeight="bolder" color="primary">
            Description
          </Typography>
          <Typography variant="subtitle1">{project?.description}</Typography>
        </Box>
        <Box
          width="20%"
          justifyContent="center"
          padding={1}
          textAlign="center"
          // sx={{ display: "flex", flexDirection: "row" }}
        > 
          <Typography variant="h6" mb={2} >Creator</Typography>
          <img
            width={50}
            height={50}
            src={project?.creator.avatarUrl}
            alt={project?.name}
          />
          <Typography variant="h6" color="primary">{project?.creator.name}</Typography>
        </Box>
      </Stack>
       <Box>
        <IconButton size="small">
          <LanguageIcon />
        </IconButton>
          <Link variant="body2" href={project?.website}>{project?.website}</Link>
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bolder" color="primary">Team</Typography>
        <List sx={{ width: '100%', maxWidth: 360}}>
        {project?.team.map((team, index) => {
          <ListItem key={index}>
            <ListItemText primary={`${team}`} />
          </ListItem>
          console.log("team", team)        })}
        </List>
      </Box>
      </Stack>
    </Container>
  );
}

export default Pitch;
