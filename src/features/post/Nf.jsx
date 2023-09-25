import React from "react";
import { useGetPostsQuery } from "./postApiSlice";
import Post from "./Post";
import NfLoader from "../../loaders/NfLoader";

import { useSelector } from "react-redux";
import { selectToken } from "../auth/auth";
import { useNavigate } from "react-router-dom";

const Nf = () => {
  const token = useSelector(selectToken);

  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  //Getting a Data to our endpoints using a GET
  const { data: post, isSuccess, isLoading, isError } = useGetPostsQuery();

  //make a placeholder ha can indicates what we should render
  let render;

  if (isLoading) render = <NfLoader />;

  if (isError) render = <h1>error content</h1>;

  if (isSuccess && token) {
    //were using entity adapter so i will return somehing like { ids:[],entities:[]}
    const { ids } = post;

    render = (
      <div className="photo_main">
        {ids?.length &&
          ids.map((postId) => <Post postId={postId} key={postId} />)}
      </div>
    );
  }

  return (
    <div className="feed">
      <div className="feed_title">
        <h1>Photo Gallery</h1>
      </div>

      <div className="main_container">{render}</div>
    </div>
  );
};

export default Nf;
