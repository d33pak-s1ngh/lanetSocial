import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar";

import MyPostWidget from "../../component//MyPostWidget";
import PostsWidget from "../../component/PostsWidget";
import UserWidget from "../../component//UserWidget";
import FriendsWidget from "../../component/FriendsWidget";
import { getUser } from "../../api/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isDesktop = useMediaQuery("(min-width:1000px)");

  const loadUser  = async() => {
    const userInfo = await getUser(userId);
    setUser(userInfo);
  }
  
  useEffect(() => {
    loadUser();
  }, []); 

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isDesktop ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isDesktop ? "26%" : undefined}>
          <UserWidget user={user} />
          <Box m="2rem 0" />
          <FriendsWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isDesktop ? "42%" : undefined}
          mt={isDesktop ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;