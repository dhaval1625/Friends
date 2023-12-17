import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { POSTDATA_URL } from "../helpers/config";
import { ref, set } from "firebase/database";
import { database } from "./firebase";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    changed: false,
  },
  reducers: {
    addPost(state, { payload }) {
      const newPost = payload;

      state.posts.unshift({
        id: uuid(),
        author: newPost.author,
        authorDP: newPost.authorDP,
        content: newPost.content,
        img: newPost.img || null,
        time: new Date().toISOString(),
        likes: [],
        totalLikes: 0,
        comments: [],
        totalComments: 0,
      });
      state.changed = true;
    },

    deletePost(state, { payload }) {
      const deletePostID = payload;

      const postIndex = state.posts.findIndex(
        (post) => post.id === deletePostID
      );

      const newPosts = state.posts.slice();
      newPosts.splice(postIndex, 1);
      state.posts = newPosts;
      state.changed = true;
    },

    replacePosts(state, { payload }) {
      state.posts = payload || [];
    },

    addLike(state, { payload }) {
      const postIndex = state.posts.findIndex(
        (post) => post.id === payload.postID
      );

      if (!state.posts[postIndex].likes) {
        state.posts[postIndex].likes = [];
      }
      state.posts[postIndex].totalLikes += 1;

      state.posts[postIndex].likes.push({
        authorID: payload.authorID,
        authorName: payload.authorName,
      });
      state.changed = true;
    },

    removeLike(state, { payload }) {
      const postIndex = state.posts.findIndex(
        (post) => post.id === payload.postID
      );
      const post = state.posts[postIndex];
      post.totalLikes -= 1;

      const likeIndex = post.likes.findIndex(
        (like) => like.authorID === payload.authorID
      );
      post.likes.splice(likeIndex, 1);
      state.changed = true;
    },

    addComment(state, { payload }) {
      const { postID, authorID, authorName, content } = payload;
      const postIndex = state.posts.findIndex((post) => post.id === postID);

      if (!state.posts[postIndex].comments) {
        state.posts[postIndex].comments = [];
      }

      state.posts[postIndex].totalComments += 1;
      state.posts[postIndex].comments.push({
        authorID,
        authorName,
        content,
      });
      state.changed = true;
    },

    resetChange(state) {
      state.changed = false;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;

export function sendPosts(posts) {
  return async function () {
    try {
      set(ref(database, "posts"), posts);
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchPosts() {
  return async function (dispatch) {
    const res = await fetch(POSTDATA_URL);

    if (!res.ok) throw new Error("Failed to send data!");

    const data = await res.json();

    dispatch(postActions.replacePosts(data));
  };
}
