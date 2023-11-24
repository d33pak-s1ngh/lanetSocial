import React, { useEffect } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { Divider, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { getUserFriends } from "../api/api";
import { setFriends } from "../state";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend";

const FriendsWidget = ({ userId }) => {
    const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();
  console.log('friens widget render', friends, user);
  const loadFriends = async () => {
    getUserFriends(userId).then((friendList) => {
      dispatch(setFriends({ friends: friendList }));
    });
  };

  useEffect(() => {    
    loadFriends();
  },[]);

  return (
    <WidgetWrapper>
      <Typography marginBottom={1} variant="h4" fontWeight={400}>
        Friend List
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      {friends.length ? friends.map(({ _id, occupation, picturePath, firstName, lastName }) => (
        <Friend
          key={`friends_${_id}`}
          friendId={_id}
          name={`${firstName} ${lastName}`}
          subtitle={occupation}
          userPicturePath={picturePath}
        />
      )): <Typography>You have not made any friends yet.</Typography>}
    </WidgetWrapper>
  );
};

export default FriendsWidget;
