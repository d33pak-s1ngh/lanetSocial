import React, { useMemo } from "react";
import Navbar from "../../component/Navbar";
import UserAvatar from "../../component/UserAvatar";
import UserWidget from "../../component/UserWidget";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from "../../component/MyPostWidget";
import PostsWidget from "../../component/PostsWidget";
import FriendsWidget from "../../component/FriendsWidget";

function Home() {
  console.log("Home page rendering");
  
  const user = useSelector((state) => state.user);
  const userMemo = useMemo(() => user, [user]);
  const isDesktop = useMediaQuery('(min-width:1000px)');

  return (
    <div>
      <Navbar />
      <Box
        width="100%"
        display={isDesktop ? 'flex': 'block'}
        justifyContent="space-between"
        gap="0.5rem"
        padding="2rem 6%"
      >
        <Box flexBasis={ isDesktop ? "26%" : undefined}>
          <UserWidget user={userMemo}></UserWidget>
        </Box>
        <Box marginTop= { !isDesktop ? '2rem' :undefined } display='flex' flexDirection='column' rowGap={2} flexBasis={ isDesktop ? "42%": undefined}>
          <MyPostWidget/>
          <PostsWidget userId={userMemo._id} />
          {/* <PostWidget post={{ userId: user._id}} /> */}
        </Box>
        <Box marginTop= { !isDesktop ? '2rem' :undefined } flexBasis={ isDesktop ? "26%": undefined}>
          <FriendsWidget userId={userMemo._id} />
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(Home);
