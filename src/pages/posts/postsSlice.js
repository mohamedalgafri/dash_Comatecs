import { createSlice } from "@reduxjs/toolkit";
import { getAllposts } from "../../api/apiPosts";

const initialState = {
  posts: [],
  isLoding: true,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: {
    [getAllposts.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [getAllposts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.isLoding = false;
      state.error = null;
    },
    [getAllposts.rejected]: (state, action) => {
      state.isLoding = false;
      console.log(action);
      state.error = action?.error.message;
    },
  },
});

export default postsSlice.reducer;
