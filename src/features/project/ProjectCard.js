import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import TextTruncate from "react-text-truncate";
import { useNavigate } from "react-router-dom";
import React from "react";
import StarIcon from "@mui/icons-material/Star";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    const projectId = project._id;
    navigate(`/projects/${projectId}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#f1f2f6",
        minHeight: 550,
        border: "1px solid green",
      }}
    >
      <CardHeader
        avatar={<Avatar src={project?.logo} alt={project?.name} />}
        title={project?.name}
        subheader={project?.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={project?.banner}
        alt={project?.name}
      />
      <CardContent>
        <IconButton color="error" size="small">
          <StarIcon />
          {project?.totalBookmarks}
        </IconButton>
        <TextTruncate
          variant="body2"
          color="text.secondary"
          line={2}
          element="p"
          truncateText="…"
          text={project?.description}
        />
        <Button variant="contained" onClick={handleExplore}>
          Explore more
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
