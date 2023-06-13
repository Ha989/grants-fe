import React, { useState } from "react";
import {
  ListItemText,
  Typography,
  Box,
  IconButton,
  styled,
  Avatar,
  Stack,
  Divider,
  Modal,
  DialogContent,
  Popover,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CommentIcon from "@mui/icons-material/Comment";
import CommentForm from "./CommentForm";
import ReplyCommentCard from "./ReplyCommentCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const CommentCard = ({ comment, projectId }) => {

  const [parentId, setParentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleReplyClick = (id) => {
    setParentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDialog(true);
  };

  const handleEditBtnClick = () => {
    setOpenDialog(false);
    setOpenEditDialog(true)
  };

  const editDialogClose = () => {
    setOpenEditDialog(false);
  }

  const handleDeleteBtnClick = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(true);
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Box backgroundColor="#f8f9fa" border="1px solid #adb5bd" mt={10}>
        {comment && (
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              padding={2}
              key={comment?._id}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Stack direction="row" alignItems="center">
                  <Avatar
                    src={comment?.author?.avatarUrl}
                    alt={comment?.author?.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <HtmlTooltip
                    title={
                      <Box width={250} height={120} padding={1}>
                        <Stack direction="row" alignItems="center">
                          <Avatar
                            src={comment?.author?.avatarUrl}
                            alt={comment?.author?.name}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Typography
                            color="primary"
                            fontWeight="bold"
                            mb={2}
                            ml={2}
                          >
                            {comment?.author?.name}
                          </Typography>
                        </Stack>
                        <Typography color="primary" fontStyle="italic">
                          Bio: {comment?.author?.bio}
                        </Typography>
                      </Box>
                    }
                    placement="bottom"
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="h7"
                          color="primary"
                          fontWeight="bolder"
                        >
                          {comment?.author?.name}
                        </Typography>
                      }
                    />
                  </HtmlTooltip>
                </Stack>
                <Box flexGrow={1} />
                <Box>
                  <IconButton onClick={handleDialogOpen}>
                    <MoreVertIcon fontSize="medium" />
                  </IconButton>
                </Box>
              </Stack>
              <Typography variant="body2" color="textPrimary" mb={1}>
                {comment?.content}
              </Typography>
              {comment?.image && (
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 200,
                    "& img": { objectFit: "cover", width: 1, height: 1 },
                  }}
                >
                  <img src={comment?.image} alt="comment" />
                </Box>
              )}
              <IconButton onClick={() => handleReplyClick(comment._id)}>
                <CommentIcon fontSize="small" />
                <Typography
                  variant="caption"
                  style={{ fontSize: "1rem" }}
                  ml={1}
                >
                  Reply
                </Typography>
              </IconButton>
            </Box>
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
                  onClick={handleEditBtnClick}
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
            <EditComment comment={comment} openEditDialog={openEditDialog} editDialogClose={editDialogClose} projectId={projectId}/>
            <DeleteComment
              id={comment._id}
              projectId={projectId}
              openDeleteDialog={openDeleteDialog}
              deleteDialogClose={deleteDialogClose}
            />

            {comment?.replies && comment?.replies.length > 0 && (
              <>
                {comment?.replies.map((reply) => (
                  <ReplyCommentCard
                    key={reply._id}
                    reply={reply}
                    projectId={projectId}
                    HtmlTooltip={HtmlTooltip}
                  />
                ))}
              </>
            )}
          </Box>
        )}
        {parentId && (
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                backgroundColor: "#fff",
                padding: 1,
              }}
            >
              <CommentForm
                projectId={projectId}
                parentId={parentId}
                onClose={handleClose}
              />
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default CommentCard;
