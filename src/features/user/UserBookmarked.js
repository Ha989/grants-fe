import {  Grid } from "@mui/material";
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
        spacing={{ xs: 2, md: 2 }}
        ml={5}
      >
        {projects?.map((project) => (
          <Grid item xs={12} sm={6} md={6} key={project._id}>
            <ProjectCard key={project._id} project={project} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserBookmarked;
