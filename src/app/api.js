import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/auth/auth";

const baseQuery = fetchBaseQuery({
  baseUrl:
    /*  "http://localhost:3500"  */ "https://photo_gallery-api.onrender.com", //Base URL which is our backend server
  credentials: "include", // require since we sending our cookies from our backend to our headers
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    //everytime the baseQuery runs its check if we have a token to set to our headers so we can manipulate our access token

    /*  console.log(token ? "header set" : "error");
     */

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  //console.log(result.error);

  if (result?.error?.status === 403) {
    const refreshToken = await baseQuery("/auth/refresh", api, extraOptions);

    console.log(refreshToken?.data?.accessToken);

    if (refreshToken?.data) {
      api.dispatch(setToken({ accessToken: refreshToken.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data.message = "Session Expired / ";
        console.log(refreshToken.error.data);
        localStorage.clear("jwt");
        api.dispatch(setToken({ accessToken: null }));
      }
      return refreshToken;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({}),
});
