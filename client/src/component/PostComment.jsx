import { Box, Button, InputBase, IconButton } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { Send } from "@mui/icons-material";
import { addNewComment } from "../api/api";
import { useDispatch } from "react-redux";
import { setComments } from "../state";

const PostComment = ({ postId, userId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const addComment = async() => {
    const newComment = await addNewComment(postId, userId, message.trim());
    dispatch(setComments({comments: [newComment], postId}));

    setMessage("");
  };
  return (
    <FlexBetween>
      <Box>
        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={"type your comment here..."}
        ></InputBase>
      </Box>

      <IconButton
        variant="outlined"
        disabled={!message.length}
        onClick={addComment}
        size="small"
      >
        <Send></Send>
      </IconButton>
    </FlexBetween>
  );
};

export default PostComment;
