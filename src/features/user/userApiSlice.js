import { apiSlice } from "../../app/api";
import { compose, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.createdAt === b.createdAt ? 0 : a.createdAt ? 1 : -1,
});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/auth/getuser",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      transformResponse: (resData) => {
        /*  console.log(resData); */

        const loadedData = resData.map((user) => {
          return { ...user, id: user._id };
        });

        /*  console.log(loadedData); */

        return userAdapter.setAll(initialState, loadedData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    edituser: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const { useGetUsersQuery, useEdituserMutation } = userApiSlice;

export const selectUserResult = userApiSlice.endpoints.getUsers.select();

const selectUserData = createSelector(
  selectUserResult,
  (userResult) => userResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllUser,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the user slice of state
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
