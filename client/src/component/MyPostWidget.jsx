import React, { useState, useRef } from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Image,
  GifBoxOutlined,
  AttachFileOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "./FlexBetween";

import '../api/api';

const MyPostWidget = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const inputFileRef = useRef();
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const { palette } = theme;
  console.log("rerender");
  const { dark, medium, main, mediumMain } = palette.neutral;

  const handleSelectedFile = (e) => {
    console.log("new file selected ");
    setFile ( e.target.files[0]);
  };
  const openFileSelection = () => {
    console.log("open file selection called");
    inputFileRef.current.click();
  };

  const resetPost = () => {
    setFile(null);
    setDescription('');
  };
  
  const submitPost = async() => {
    console.log("selected file", file);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("userId", user._id);
    if(file) {
      formData.append("picturePath", file.name);
      formData.append("picture", file);
    }

    try{
        const response = fetch(`${import.meta.env.VITE_API_URI}/posts`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        const newPost = response.json();
        resetPost();
        console.log('new post', newPost);
    } catch (error) {
        console.log('Post creation failed: ',error);
    }
  };

  return (
    <WidgetWrapper>
      <Box display="flex" alignItems="center" gap="1rem">
        <UserAvatar picturePath={user.picturePath}></UserAvatar>
        <Box
          display="flex"
          flex="1"
          sx={{
            backgroundColor: palette.neutral.light,
            borderRadius: "30px",
            height: "60px",
            padding: "0px 1rem",
          }}
        >
          <InputBase
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            placeholder="what's on your mind..."
          ></InputBase>
        </Box>
      </Box>
      <Box
        p="1rem"
        marginTop="10px"
        marginBottom={"1rem"}
        borderRadius={"5px"}
        border={`1px solid ${palette.neutral.medium}`}
      >
        {/* <input type='file' /> */}
        <Box
          border={`2px dashed ${palette.primary.main}`}
          p="0.5rem"
          sx={{
            "&:hover": { cursor: "pointer" },
            ">p": { margin: 0 },
            '>input[type="file"]': { display: "none" },
          }}
        >
          <input
            name="picture"
            onChange={handleSelectedFile}
            ref={inputFileRef}
            type="file"
          ></input>
          <FlexBetween>
            <Typography color={medium}>
              {file?.name || "Add picture here"}
            </Typography>
            <IconButton onClick={openFileSelection}>
              <EditOutlinedIcon />
            </IconButton>
          </FlexBetween>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "10px" }} />
      <Box
        color={medium}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginTop="10px"
      >
        <Box
          gap="3px"
          color={mediumMain}
          justifyContent="center"
          display="flex"
        >
          <Image /> <Typography> Image</Typography>
        </Box>
        {isDesktop ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          color="primary"
          varient="contained"
          onClick={submitPost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              color: medium,
            },
          }}
        >
          Post
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
