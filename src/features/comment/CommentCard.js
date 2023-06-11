import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  List,
  Box,
  IconButton,
  styled,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CommentIcon from "@mui/icons-material/Comment";

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

const CommentCard = ({ comment }) => {
  const handleReplyClick = () => {
    // Handle reply button click event
  };

  return (
    <Box backgroundColor="#f8f9fa" border="1px solid #adb5bd" mt={10}>
      {comment && (
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            padding={2}
          >
            <Stack direction="row" alignItems="center">
              <Avatar
                src={comment?.author?.avatarUrl}
                alt={comment?.author?.name}
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <HtmlTooltip
                title={
                  <Box width={250} height={150}>
                    <Avatar
                      src={comment?.author?.avatarUrl}
                      alt={comment?.author?.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography color="primary" fontWeight="bold" mb={1}>
                      {comment?.author?.name}
                    </Typography>
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
            <Typography variant="body2" color="textPrimary" mb={1}>
              {comment?.content}
            </Typography>
            {comment?.image && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 300,
                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={comment?.image} alt="comment" />
              </Box>
            )}
            <IconButton onClick={handleReplyClick}>
              <CommentIcon fontSize="small" />
              <Typography variant="caption" style={{ fontSize: "1rem" }} ml={1}>
                Reply
              </Typography>
            </IconButton>
          </Box>
          <Divider />
          {comment?.replies && comment?.replies.length > 0 && (
            <>
              {comment?.replies.map((reply) => (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  padding={2}
                  backgroundColor="#e9ecef"
                  borderLeft="2px solid blue"
                >
                  <Stack direction="row" alignItems="center" mb={1}>
                    <Avatar
                      src={reply?.author?.avatarUrl}
                      alt={reply?.author?.name}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <HtmlTooltip
                      title={
                        <Box width={250} height={150}>
                          <Avatar
                            src={reply?.author?.avatarUrl}
                            alt={reply?.author?.name}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Typography color="primary" fontWeight="bold" mb={1}>
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
                          <Typography
                            variant="h7"
                            color="primary"
                            fontWeight="bolder"
                          >
                            {reply?.author?.name}
                          </Typography>
                        }
                      />
                    </HtmlTooltip>
                  </Stack>
                  <Typography variant="h7" color="textPrimary" mb={1}>
                    {reply?.content}
                  </Typography>
                  {reply?.image && (
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        height: 300,
                        "& img": { objectFit: "cover", width: 1, height: 1 },
                      }}
                    >
                      <img src={reply?.image} alt="reply" />
                    </Box>
                  )}
                  <IconButton onClick={handleReplyClick}>
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
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommentCard;
