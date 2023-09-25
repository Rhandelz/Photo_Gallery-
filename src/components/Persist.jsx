import React from "react";
import { store } from "../app/store";
import { userApiSlice } from "../features/user/userApiSlice";
import { postApiSlice } from "../features/post/postApiSlice";
import { Outlet } from "react-router-dom";

const Persist = () => {
  React.useEffect(() => {
    //console.log("subscribing");
    const user = store.dispatch(userApiSlice.endpoints.getUsers.initiate());
    const post = store.dispatch(postApiSlice.endpoints.getPosts.initiate());

    return () => {
      // console.log("unsubscribing");
      post.unsubscribe();
      user.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Persist;
