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
  const email = "@info.grants.io";
  console.log("commens", project?.comments);
  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Box>
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="bolder"
          color="primary"
        >
          DISCUSSION
        </Typography>
        <Typography textAlign="center" variant="subtitle2" color="#495057">
          Ask questions and share feedback with the {project?.name} team below.
          If you have support related questions for Grants, please contact at{" "}
          <Link href={`mailto:${email}`} color="primary">
            {" "}
            {email}
          </Link>
        </Typography>
        <CommentForm projectId={id} />
        <List>
          {project &&
            project.comments.map((comment) => (
              <CommentCard comment={comment} />
            ))}
        </List>
      </Box>
    </Container>
  );
}

export default Discussion;
