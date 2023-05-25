import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import TextTruncate from 'react-text-truncate';
import React from 'react'
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ProjectCard({ project }) {
    const dispatch = useDispatch();
    
    
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#f1f2f6", height: 550, border: "1px solid green"}} >
      <CardHeader
        avatar={
          <Avatar src={project?.logo} alt={project?.name}/>
        }
        title={project?.name}
        subheader={project?.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={project?.banner}
        alt={project?.name}
      />
      <CardContent display="flex" flexDirection="row">
        <TextTruncate variant="body2" color="text.secondary" line={3} 
            element="p"
            truncateText="…"
            text={project?.description} />
        <Button variant="contained">Explore more</Button>
      </CardContent>
     
    </Card>
  )
}

export default ProjectCard