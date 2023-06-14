import { Card, DialogContent, Popover, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationOfUser } from "./notificationSlice";
import SingleNotification from "./SingleNotification";

function NotificationCard({ notifications }) {

  
  return (
    <DialogContent>
      {notifications.length > 0 ? (
        notifications.map((notification) => 
          <SingleNotification notification={notification}/>
         )
      ) : (
        <Typography variant="h7" color="primary">Nothing here yet!</Typography>
      )}      
    </DialogContent>
  );
}

export default NotificationCard;
