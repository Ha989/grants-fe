import { Box, Container, List, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Discussion({ project }) {
  const { id } = useParams();

  return (
    <Container >
      <Box mt={1}>
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="bolder"
          color="primary"
        >
          DISCUSSION
        </Typography>
        <Typography textAlign="center" variant="subtitle2" color="#495057">
          Share feedback or suggestions with the {project?.name} team below.
        </Typography>
        <CommentForm projectId={id} />
        <List>
          {project &&
            project.comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} projectId={id}/>
            ))}
        </List>
      </Box>
    </Container>
  );
}

export default Discussion;
