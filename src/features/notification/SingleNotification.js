import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function SingleNotification({ notification }) {
  return (
   <Stack width={300} height={100} border="1px solid green" >
     <Typography>{notification?.message}</Typography>
     from <Typography>{notification?.donationId?.amount}</Typography>
   </Stack>
  )
}

export default SingleNotification