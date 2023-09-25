import { apiSlice } from "../../app/api";
import { compose, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.createdAt === b.createdAt ? 0 : a.createdAt ? 1 : -1,
});

const initialState = postAdapter.getInitialState();

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/post",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      transformResponse: (resData) => {
        //console.log(resData);

        const loadedData = resData.map((post) => {
          return { ...post, id: post._id };
        });

        // console.log(loadedData);

        return postAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else return [{ type: "Post", id: "LIST" }];
      },
    }),

    addpost: builder.mutation({
      query: (data) => ({
        url: "/post/addpost",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    delpost: builder.mutation({
      query: (id) => ({
        url: "/post/deletepost",
        method: "DELETE",
        body: {
          ...id,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useAddpostMutation, useGetPostsQuery, useDelpostMutation } =
  postApiSlice;

export const selectPostResult = postApiSlice.endpoints.getPosts.select();

const selectPostData = createSelector(
  selectPostResult,
  (postResult) => postResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPost,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the post slice of state
} = postAdapter.getSelectors((state) => selectPostData(state) ?? initialState);
