import {
  Avatar,
  Box,
  DialogContent,
  Divider,
  IconButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteComment from "./DeleteComment";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ReplyCommentCard({ reply, HtmlTooltip, projectId }) {

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const handleDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDialog(true);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDeleteBtnClick = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(true)
    console.log("id", reply?._id)
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false)
  }
  return (
    <>
      <Box
        key={reply._id}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        padding={2}
        backgroundColor="#e9ecef"
        borderLeft="4px solid blue"
        borderBottom="1px solid #adb5bd"
        ml={2}
        mt={1}
      >
        <Stack
          alignItems="center"
          mb={1}
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Avatar
            src={reply?.author?.avatarUrl}
            alt={reply?.author?.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <HtmlTooltip
            title={
              <Box width={250} height={150} padding={1}>
                <Avatar
                  src={reply?.author?.avatarUrl}
                  alt={reply?.author?.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography color="primary" fontWeight="bold" mb={2} ml={2}>
                  {reply?.author?.name}
                </Typography>
                <Typography color="primary" fontStyle="italic">
                  Bio: {reply?.author?.bio}
                </Typography>
              </Box>
            }
            placement="bottom"
          >
            <ListItemText
              primary={
                <Typography variant="h7" color="primary" fontWeight="bolder">
                  {reply?.author?.name}
                </Typography>
              }
            />
          </HtmlTooltip>
          <Box flexGrow={1} />
          <Box>
            <IconButton onClick={handleDialogOpen}>
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Stack>
        <Typography variant="h7" color="textPrimary" mb={1}>
          {reply?.content}
        </Typography>
        {reply?.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 200,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={reply?.image} alt="reply" />
          </Box>
        )}
        <Popover
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <DialogContent>
              <Stack
                flexDirection="row"
                alignItems="center"
                onClick={handleEdit}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <Typography variant="subtitle2">Edit</Typography>
              </Stack>
              <Divider />
              <Stack
                flexDirection="row"
                alignItems="center"
                onClick={handleDeleteBtnClick}
              >
                <IconButton>
                  <DeleteIcon />
                </IconButton>
                <Typography variant="subtitle2">Delete</Typography>
              </Stack>
            </DialogContent>
          </Popover>
          <DeleteComment id={reply?._id} openDeleteDialog={openDeleteDialog} deleteDialogClose={deleteDialogClose} projectId={projectId}/>
      </Box>
    </>
  );
}

export default ReplyCommentCard;
