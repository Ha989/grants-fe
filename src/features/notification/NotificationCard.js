import { Card, DialogContent, Popover } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationOfUser } from "./notificationSlice";
import SingleNotification from "./SingleNotification";

function NotificationCard() {

    const dispatch = useDispatch();
    const notifications = useSelector(
      (state) => state.notification.notifications
    );
    
    useEffect(() => {
        dispatch(getAllNotificationOfUser())
    }, []);

  return (
    <DialogContent>
      {notifications?.map((notification) => 
        <SingleNotification notification={notification}/>
       )}
    </DialogContent>
  );
}

export default NotificationCard;
