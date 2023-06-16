import { DialogContent, Pagination, Typography } from "@mui/material";
import React from "react";
import SingleNotification from "./SingleNotification";

function NotificationCard({ notifications, totalPage, handleChange }) {
  return (
    <DialogContent>
      { notifications && notifications?.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <SingleNotification
              key={notification._id}
              notification={notification}
            />
          ))}
          <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </>
      ) : (
        <Typography variant="h6" textAlign="center" color="primary">Nothing Here Yet!</Typography>
      )}
    </DialogContent>
  );
}

export default NotificationCard;
