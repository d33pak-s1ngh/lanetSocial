let store;

export const injectStore = (_store) => {
  store = _store;
};

const fetchCall = (
  path,
  options = {
    method: "GET",
    headers: {
      Authorization: `bearer ${store.getState().token}`,
    },
  }
) => {
  const url = `${import.meta.env.VITE_API_URI}${path}`;

  return fetch(url, options);
};

export const getUserById = async (userId) => {
  try {
    const response = await fetchCall(`/users/${userId}`);
    return response.json();
  } catch (error) {
    console.log("Get user failed: ", error.message);
    return null;
  }
};

export const getPosts = async () => {
  const response = await fetchCall(`/posts`);
  const posts = await response.json();
  return posts.sort(
    (postA, postB) =>
      new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
  );
};

export const getUserPosts = async (userId) => {
  const response = await fetchCall(`/posts/${userId}/posts`);
  const posts = await response.json();
  return posts.sort(
    (postA, postB) =>
      new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime()
  );
};

export const getUserFriends = async (userId) => {
  const response = await fetchCall(`/users/${userId}/friends`);
  const friends = await response.json();
  return friends;
};

export const patchLike = async (postId, userId) => {
  const response = await fetchCall(`/posts/${postId}/like`, {
    method: "PATCH",
    headers: {
      Authorization: `bearer ${store.getState().token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const updatedPost = await response.json();
  return updatedPost;
};

export const addNewComment = async (postId, userId, message) => {
  const response = await fetchCall(`/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${store.getState().token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, message }),
  });
  const updatedPost = await response.json();
  return updatedPost;
};

export const getComments = async (postId) => {
  const response = await fetchCall(`/posts/${postId}/comment`);
  return await response.json();
};

export const getUser = async (userId) => {
  const response = await fetchCall(`/users/${userId}`);
  return await response.json();
};
