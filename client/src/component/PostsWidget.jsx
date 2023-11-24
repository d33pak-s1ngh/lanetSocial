import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";
import { getPosts, getUserPosts } from "../api/api"
import { Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const loadPost = async() => {
        if (isProfile) {
            const userPost = await getUserPosts(userId);
            dispatch(setPosts({ posts: userPost }));
          } else {
            const allPosts = await getPosts();
            dispatch(setPosts({ posts: allPosts }));
          }
          console.log('posts list render ends', posts);
    }
    loadPost();
    
  }, []);

  return (
    <>
      {posts.length ? posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        )
      ): <Typography variant="h3">You haven't added any post! Its time to create your first one.</Typography>}
    </>
  );
};

export default PostsWidget;