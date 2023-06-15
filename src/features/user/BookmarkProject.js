import React from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkProject, getBookmarkedOfUser, getUser } from "./userSlice";
import { Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function BookmarkProject({ project }) {
  const auth = useAuth();
  const user = auth?.user;
  const userId = user?._id;
  const projectId = project._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookmarkProjects = useSelector((state) => state.user.bookmarked);
  console.log("bookmark", bookmarkProjects);

  const isBookmarked = bookmarkProjects?.includes(project._id);
  console.log("is", isBookmarked);

  const handleBookmarkClick = () => {
    if (user) {
      dispatch(bookmarkProject({ projectId, userId }));
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <Box onClick={handleBookmarkClick}>
      <IconButton sx={{ color: isBookmarked ? "red" : "inherit" }}>
        <StarIcon />
      </IconButton>
    </Box>
  );
}

export default BookmarkProject;
