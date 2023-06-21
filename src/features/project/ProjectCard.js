import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./projectcard.css";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    const projectId = project._id;
    navigate(`/projects/${projectId}`);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {project && (
        <Card
          className={isHovered ? "project-card-hovered" : "project-card"}
          sx={{
            width: 320,
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleExplore}
        >
          <CardMedia
            component="img"
            height="200"
            image={project?.banner}
            alt={project?.name}
            style={{
              position: "relative",
              flex: "0 0 auto",
            }}
          />
          <img
            src={project?.logo}
            alt="Logo"
            style={{
              position: "absolute",
              top: "40%",
              left: "15%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "60px",
              border: "1px solid #fff",
              zIndex: 1,
              borderRadius: 4,
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            }}
          />
          <CardContent
            style={{
              position: "relative",
              zIndex: 1,
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "250px",
              marginTop: "20px",
            }}
          >
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="green"
                >
                  {project?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {project?.title}
                </Typography>
              </Box>
            </Box>
            <Box height={80}>
              <Divider />
              <Typography
                variant="h6"
                style={{ marginTop: "10px" }}
                color="primary"
                fontWeight="bolder"
              >
                {project?.currentRaised ? `$${project.currentRaised.toFixed(2)} Raised` : `$0 Raised`}
              </Typography>
              <IconButton color="error" size="small">
                <FavoriteIcon />
                {project?.totalBookmarks}{" "}
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ProjectCard;
