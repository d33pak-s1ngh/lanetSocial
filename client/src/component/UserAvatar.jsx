import { Box } from "@mui/material";
import React from "react";
import avatar from "../../public/avatar.svg"
const UserAvatar = ({ size, picturePath }) => {
  if (!size) {
    size = 60; //default avatar size
  }
  return (
    <Box height={size} width={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={picturePath ? `${import.meta.env.VITE_API_URI}/assets/${picturePath}` : avatar}
      />
    </Box>
  );
};

export default UserAvatar;
