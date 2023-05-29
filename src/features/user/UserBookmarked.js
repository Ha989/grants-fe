import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

function UserBookmarked({ user }) {
    const bookmarked  = user?.bookmarked;
    // const project = bookmarked?.forEach((project) => {
    //   console.log("p", project);
    // });
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      { bookmarked.map((project, index) => {
        return (
            <Typography>{project}</Typography>
        )
})}
    </Box>
  )
}

export default UserBookmarked;