import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../project/ProjectCard";
import { getBookmarkedOfUser } from "./userSlice";

function UserBookmarked() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.bookmarked);

  useEffect(() => {
    dispatch(getBookmarkedOfUser());
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 8, md: 12 }}
      >
        {projects?.map((project, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <ProjectCard key={project._id} project={project} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserBookmarked;
