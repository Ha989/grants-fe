import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function DeleteComment({id, openDeleteDialog, deleteDialogClose, projectId }) {
     
    const dispatch = useDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment({id, projectId}))
        deleteDialogClose();
      }

  return (
    <Dialog open={openDeleteDialog} onClose={deleteDialogClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this comment?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteDialogClose}>Cancel</Button>
        <Button onClick={handleDeleteComment}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteComment;
