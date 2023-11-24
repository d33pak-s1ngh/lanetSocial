import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    mode: 'light',
    posts: [],
    token: null,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        },
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user friend doesn't exist");
            }
        },
        setPosts: (state, action) => {
            console.log('set posts',action.payload.posts);
            state.posts = action.payload.posts;
        },
        setComments: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post._id === action.payload.postId) {
                    if(action.payload.status == 'reload') {
                        post.comments = action.payload.comments;
                    } else {
                        if(post.comments && post.comments?.length) {
                            post.comments = [...post.comments, ...action.payload.comments];
                        } else {
                            post.comments = action.payload.comments;
                        }
                    }
                }
                return post;
            });
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
        },
    }
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost, setComments} = authSlice.actions;
export default authSlice.reducer;