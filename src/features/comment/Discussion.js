import { Box, Container, List, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../project/projectSlice";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Discussion() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

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
