import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import auth from "../features/auth/auth";
import url from "../features/post/upload";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: auth,
    url: url,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
