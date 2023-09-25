import React from "react";
import { selectPostById } from "./postApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserById } from "../user/userApiSlice";
import TimeAgo from "../user/TimeAgo";

const Post = ({ postId }) => {
  //use a selector that we have been import to our slice were passing he ids as a props that we can use o call an specific data

  const post = useSelector((state) => selectPostById(state, postId));
  const user = useSelector((state) => selectUserById(state, String(post.user)));

  //un log to view what it return
  //  console.log(post);

  return (
    <div className="">
      <img src={post.photoUrl} alt="" />
      <span className="post_info">
        <Link className="link" to={`/${post.user}`}>
          {user ? user.name : "....."}
        </Link>
        <TimeAgo dateTime={post.createdAt} />
      </span>
    </div>
  );
};

export default Post;
