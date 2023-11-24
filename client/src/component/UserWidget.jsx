import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import UserAvatar from "./UserAvatar";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserWidget = ({ user }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper
      sx={{
        // maxWidth: "400px",
        padding: "1rem",
        // background: "lightGray",
      }}
    >
      {/* 1st row */}

      <FlexBetween sx={{ paddingBottom: "0.5rem" }}>
        <Box display="flex" gap="1rem" alignItems="center">
          <UserAvatar size={60} picturePath={user.picturePath}></UserAvatar>
          <div>
            <Typography
              color={dark}
              variant="h6"
              fontWeight="bold"
              sx={{cursor: 'pointer'}}
              onClick={() => navigate(`/profile/${user._id}`)}
            >{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography color={medium}>
              {user.friends.length} Friends
            </Typography>
          </div>
        </Box>
        {/* <IconButton> */}
        <ManageAccountsOutlined />
        {/* </IconButton> */}
      </FlexBetween>

      <Divider />

      {/* 2nd Row */}

      <Box p="1rem 0">
        <Box
          display="flex"
          color={medium}
          alignItems="center"
          gap="1rem"
          mb="0.5rem"
        >
          <LocationOnOutlined />
          <Typography color={medium} display="inline-block">
            {user.location}
          </Typography>
        </Box>
        <Box display="flex" color={medium} alignItems="center" gap="1rem">
          <WorkOutlineOutlined />
          <Typography display="inline-block">{user.occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box alignItems={"center"} justifyContent={"center"} p="1rem 0">
        <FlexBetween>
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main}>{user.viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main}>{user.impressions}</Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* 3rd Row */}
      <Box p="1rem 0">
        <Typography varient="h3" fontWeight="bold" color={main}>
          Social Profile
        </Typography>
        <FlexBetween mt="0.5rem">
          <Box display="flex" alignItems="center" gap="1rem">
            <Twitter sx={{ fontSize: "25px", color: medium }} />
            <Box>
              <Typography color={main}>Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Box>
          <EditOutlined />
        </FlexBetween>
        <FlexBetween>
          <Box display="flex" alignItems="center" gap="1rem">
            <LinkedIn sx={{ fontSize: "25px", color: medium }} />
            <Box>
              <Typography color={main}>LinkedIn</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Box>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
