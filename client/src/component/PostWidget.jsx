import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, IconButton, Divider } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import {
  ShareOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { patchLike, getComments } from "../api/api";
import { setPost, setComments } from "../state";
import PostComment from "./PostComment";
import UserAvatar from "./UserAvatar";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();

  const primary = palette.primary.main;
  const { main, mediumMain } = palette.neutral;

  const isLiked = likes[loggedInUserId];
  const likeCount = Object.keys(likes).length;

  comments = comments || [];

  const handleLike = async () => {
    const updatedPost = await patchLike(postId, loggedInUserId);
    dispatch(setPost({ post: updatedPost }));
  };

  const loadComments = async() => {
    const comments = await getComments(postId);
    dispatch(setComments({comments, postId, status: 'reload'}))
  };

  useEffect(() => {
    loadComments();
  },[]);

  return (
    <WidgetWrapper>
      <Box>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={`${location} ${new Date(createdAt).toLocaleString()}`}
          userPicturePath={userPicturePath}
        />
        <Box marginTop={"10px"}>
          <Typography color={mediumMain}>
            {description}
          </Typography>
          {picturePath && (
            <img
              width="100%"
              // height="100%"
              alt="post"
              style={{
                borderRadius: "0.75rem",
                marginTop: "0.75rem",
                objectFit: "cover",
                maxHeight: "500px",
              }}
              src={`${import.meta.env.VITE_API_URI}/assets/${picturePath}`}
            ></img>
          )}
        </Box>
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments?.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        <PostComment postId={postId} userId={loggedInUserId}></PostComment>
        {comments.length ? (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${comment.userId}${comment.postId}-${i}`}>
                <Divider />
                <Box display={"flex"} padding={'0.2rem'} alignItems='center' >
                <UserAvatar picturePath={comment.user.picturePath} size={30}/>
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "0.5rem" }}>
                  {comment.message}
                </Typography>
                </Box>
              </Box>
            ))}
            <Divider />
          </Box>
        ): <></>}
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
