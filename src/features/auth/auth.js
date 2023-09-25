import { createSlice } from "@reduxjs/toolkit";

const authAction = createSlice({
  name: "auth",
  initialState: { token: JSON.parse(localStorage.getItem("token")) },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;

      localStorage.setItem("token", JSON.stringify(accessToken));

      state.token = JSON.parse(localStorage.getItem("token"));
    },
    logOut: (state, action) => {
      localStorage.clear("toekn");
    },
  },
});

export const { setToken, logOut } = authAction.actions;

export const selectToken = (state) => state.auth.token;

export default authAction.reducer;
