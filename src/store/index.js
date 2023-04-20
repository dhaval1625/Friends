import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import userSlice from "./user-slice";
import postSlice from "./post-slice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    users: userSlice.reducer,
    posts: postSlice.reducer,
  },
});

export default store;
