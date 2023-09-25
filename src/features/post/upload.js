import { createSlice } from "@reduxjs/toolkit";

const upload = createSlice({
  name: "url",
  initialState: { url: null },
  reducers: {
    setUrl: (state, action) => {
      const { result } = action.payload;
      state.url = result;
    },
  },
});

export const { setUrl } = upload.actions;

export const selectUrl = (state) => state.url.url;

export default upload.reducer;
