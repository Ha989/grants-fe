import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkProject, getBookmarkedOfUser } from "./userSlice";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function BookmarkProject({ project }) {
  const auth = useAuth();
  const user = auth?.user;
  const userId = user?._id;
  const projectId = project._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarkProjects = useSelector((state) => state.user.bookmarked);
  const [starColor, setStarColor] = useState("inherit");

  const handleBookmarkClick = () => {
    if (user) {
      dispatch(bookmarkProject({ projectId, userId }));
    } else {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getBookmarkedOfUser());
    }
  }, [dispatch, user]);
  

  useEffect(() => {
    // Check if the current project is bookmarked and update the star color
    const isProjectBookmarked = bookmarkProjects.some(
      (project) => project._id === projectId
    );
    setStarColor(isProjectBookmarked ? "red" : "inherit");
  }, [bookmarkProjects, projectId]);

  return (
    <Box onClick={handleBookmarkClick}>
      <IconButton sx={{ color: starColor }}>
        <FavoriteIcon />
      </IconButton>
    </Box>
  );
}

export default BookmarkProject;
