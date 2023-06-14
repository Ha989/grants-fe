import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function SingleNotification({ notification }) {
  return (
    <Stack
      width={300}
      height={100}
      border="1px solid #adb5bd"
      backgroundColor="#e9ecef"
      justifyContent="center"
      alignItems="flex-start"
      borderRadius={1}
      padding={1}
    >
      {notification && (
        <>
          {notification.type === "donation" && (
            <>
              <Typography>{notification.message}</Typography>
              <Typography variant="h6" color="primary">
                by {notification.donationId?.projectId?.name} with $
                {notification.donationId?.amount}
              </Typography>
            </>
          )}
          {notification.type === "bookmark" && (
            <>
              <Typography variant="h7" color="primary">
                Bookmark notification
              </Typography>
              <Typography variant="subtitle1">
                {notification.message}
              </Typography>
            </>
          )}
          {notification.type === "comment" && (
            <>
              <Typography variant="h7" color="primary">
                Comment notification
              </Typography>
              <Typography>{notification.from}</Typography>
              <Typography variant="subtitle1">
                {notification.message}
              </Typography>
            </>
          )}
        </>
      )}
    </Stack>
  );
}

export default SingleNotification;
