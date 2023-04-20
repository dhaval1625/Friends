import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { loggedIn: false },
  reducers: {
    loginHandler(state, actions) {
      state.loggedIn = true;
    },
    logoutHandler(state, actions) {
      state.loggedIn = false;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
