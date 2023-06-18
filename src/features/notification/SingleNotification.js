import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

function SingleNotification({ notification }) {
  return (
    <>
      <Stack
        width={300}
        height={100}
        backgroundColor="#fff"
        justifyContent="center"
        alignItems="flex-start"
        padding={1}
        mb={1}
      >
        {notification && (
          <>
            {notification.type === "donation" && (
              <>
                <Typography variant="h7" color="primary">
                  Donations notification
                </Typography>
                <Typography>{notification.message}</Typography>
                <Typography variant="h7" color="primary">
                  {notification.donationId?.projectId?.name} with $
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
                <Typography variant="subtitle1">
                  {notification.message}
                </Typography>
              </>
            )}
          </>
        )}
      </Stack>
      <Divider />
    </>
  );
}

export default SingleNotification;
