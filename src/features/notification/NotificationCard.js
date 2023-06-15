import { DialogContent } from "@mui/material";
import React from "react";
import SingleNotification from "./SingleNotification";

function NotificationCard({ notifications }) {

  
  return (
    <DialogContent>
      {notifications && (
        notifications.map((notification) => 
          <SingleNotification key={notification._id} notification={notification}/>
         ))}   
    </DialogContent>
  );
}

export default NotificationCard;
